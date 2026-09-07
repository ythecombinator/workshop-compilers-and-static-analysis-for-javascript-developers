import { DerivedStateEffectDemo } from './derived-state-effect';
import { LazyStateInitializerDemo } from './lazy-state-initializer';

export default function Demo() {
  return (
    <div className="space-y-6">
      <LazyStateInitializerDemo title="ast-grep · JSSG · lazy useState" />
      <DerivedStateEffectDemo title="ast-grep · JSSG · derived state" />
    </div>
  );
}
