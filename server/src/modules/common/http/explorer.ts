import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';
import {
  DiscoveryService,
  MetadataScanner,
  ModulesContainer,
} from '@nestjs/core';
import { PATH_METADATA, MODULE_PATH } from '@nestjs/common/constants';
import { ConfigService } from '@nestjs/config';

import { CONFIG } from '@src/consts/config';

import { ROUTE_NAME } from './consts';
import { HttpMetadata } from './metadata';

@Injectable()
export class HttpExplorer {
  private applicationId: string;
  private basePath: string;

  constructor(
    private readonly config: ConfigService,
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly container: ModulesContainer,
  ) {}

  onModuleInit() {
    const wrappers = this.discovery.getControllers();
    this.applicationId = this.container.applicationId;
    this.basePath = this.config.get(CONFIG.BASE_PATH);

    wrappers.forEach((w) => {
      const { instance, metatype, host } = w;
      if (
        !instance ||
        typeof instance === 'string' ||
        !Object.getPrototypeOf(instance)
      ) {
        return;
      }

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) =>
          this.lookupListeners(
            instance,
            key,
            this.getBasePath(host.metatype, metatype),
          ),
      );
    });
  }

  getBasePath(
    moduleMetatype: Function | Type<any>,
    controllerMetatype: Function | Type<any>,
  ) {
    const modulePath = Reflect.getMetadata(
      MODULE_PATH + this.applicationId,
      moduleMetatype,
    );
    const controllerPath = Reflect.getMetadata(
      PATH_METADATA,
      controllerMetatype,
    );

    return join(this.basePath, modulePath, controllerPath);
  }

  lookupListeners(
    instance: Record<string, Function>,
    key: string,
    baseRoute = '',
  ) {
    const hasRouteName = Reflect.hasMetadata(ROUTE_NAME, instance, key);

    if (!hasRouteName) return;
    const routeName = Reflect.getMetadata(ROUTE_NAME, instance, key);

    HttpMetadata.addNamedRoute(
      routeName,
      join(baseRoute, Reflect.getMetadata(PATH_METADATA, instance[key])),
    );
  }
}
