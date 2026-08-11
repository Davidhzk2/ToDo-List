import {
  Injectable,
  EnvironmentInjector,
  runInInjectionContext,
  inject,
} from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getValue,
} from '@angular/fire/remote-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  public categoriesEnabled$ = new BehaviorSubject<boolean>(true);

  private remoteConfig = inject(RemoteConfig);
  private injector = inject(EnvironmentInjector);

  constructor() {
    this.initRemoteConfig();
  }

  async initRemoteConfig() {
    try {
      const activated = await fetchAndActivate(this.remoteConfig);

      // Mantenemos el contexto de inyección activo para que AngularFire no lance el warning
      const isEnabled = runInInjectionContext(this.injector, () => {
        return getValue(this.remoteConfig, 'enable_categories').asBoolean();
      });

      this.categoriesEnabled$.next(isEnabled);

      console.log('Remote config activado:', activated);
      console.log('Categorías habilitadas:', isEnabled);
    } catch (err) {
      console.error('Error al cargar remote config:', err);
    }
  }
}
