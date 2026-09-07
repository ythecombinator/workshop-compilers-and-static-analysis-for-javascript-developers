import { DerivedStateEffectDemo } from './derived-state-effect';
import { LazyStateInitializerDemo } from './lazy-state-initializer';

export default function Demo() {
  return (
    <div className="space-y-6">
      <LazyStateInitializerDemo title="ast-grep · YAML · lazy useState" />
      <DerivedStateEffectDemo title="ast-grep · YAML · derived state" />
    </div>
  );
}
