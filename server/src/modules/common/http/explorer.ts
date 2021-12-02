import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { PATH_METADATA, MODULE_PATH } from '@nestjs/common/constants';
import { ConfigService } from 'nestjs-config';

import { CONFIG } from '@src/consts/config';

import { ROUTE_NAME } from './consts';
import { HttpMetadata } from './metadata';

@Injectable()
export class HttpExplorer {
  constructor(
    private readonly config: ConfigService,
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit() {
    HttpMetadata.setBaseUrl(this.config.get(['express', CONFIG.BASE_PATH]));

    const wrappers = this.discovery.getControllers();
    // const modulesContainer = this.discovery.getModules();

    wrappers.forEach((w) => {
      const { instance, metatype } = w;
      if (
        !instance ||
        typeof instance === 'string' ||
        !Object.getPrototypeOf(instance)
      ) {
        return;
      }

    //   console.log('PATH_METADATA', Reflect.getMetadata(MODULE_PATH, w.host?.metatype), Reflect.getMetadata(PATH_METADATA, metatype));

  
    // const modulePath = Reflect.getMetadata(
    //   MODULE_PATH + modulesContainer.applicationId,
    //   metatype,
    // );
    
    // console.log('modulePath', modulePath ?? Reflect.getMetadata(MODULE_PATH, metatype))
        
    this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) =>
          this.lookupListeners(
            instance,
            key,
            Reflect.getMetadata(PATH_METADATA, metatype),
          ),
      );
    });
  }

  lookupListeners(
    instance: Record<string, Function>,
    key: string,
    baseRoute?: string,
  ) {
    baseRoute = baseRoute || '';
    // console.log(ROUTE_NAME, instance, key)
    // console.log(ROUTE_NAME, Reflect.getMetadata(ROUTE_NAME, instance, key), Reflect.getMetadata(PATH_METADATA, instance[key]))
    // Reflect.getMetadata(ROUTE_NAME, target)
    const hasRouteName = Reflect.hasMetadata(ROUTE_NAME, instance, key);
    if (!hasRouteName) return;
    const routeName = Reflect.getMetadata(ROUTE_NAME, instance, key);

    HttpMetadata.addNamedRoute( 
      routeName,
      join(baseRoute, Reflect.getMetadata(PATH_METADATA, instance[key])),
    );
  }
}