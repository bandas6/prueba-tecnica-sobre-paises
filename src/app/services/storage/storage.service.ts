import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    try {
      await this._storage?.set(key, value);
      return await this._storage?.get(key);  // Se usa la clave correcta
    } catch (error) {
      console.error('Error al guardar en el almacenamiento:', error);
    }
  }

  async get(key: string) {
    try {
      return await this._storage?.get(key);
    } catch (error) {
      console.error('Error al obtener datos del almacenamiento:', error);
    }
  }

  async remove(key: string) {
    try {
      await this._storage?.remove(key);
    } catch (error) {
      console.error('Error al eliminar datos del almacenamiento:', error);
    }
  }

  async clear() {
    try {
      await this._storage?.clear();
    } catch (error) {
      console.error('Error al limpiar el almacenamiento:', error);
    }
  }
}
