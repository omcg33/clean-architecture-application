import { ROUTE_NAME } from './consts';
import 'reflect-metadata';

export function WithAlias(name: string) {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(ROUTE_NAME, name, target, propertyKey);

    return descriptor;
  };
}