import { memo, useCallback, useState } from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Typography from '@components/ui/typography';
import logger from '@utils/logger';

//  ---------------------------------------------------------------------------
//  PERF ANTI-PATTERNS TO BE FIXED VIA CUSTOM CODEMODS
//  ---------------------------------------------------------------------------
//
//  This file contains two common performance anti-patterns that can be
//  detected and fixed automatically with custom jscodeshift transforms:
//
//    1. Inline object literals as JSX props → breaks memo() / shallow compare
//    2. Inline arrow functions as JSX event handlers → new ref every render
//
//  Run the NPM scripts to apply the custom codemods:
//    yarn demo:jscodeshift:custom:extract-styles
//    yarn demo:jscodeshift:custom:extract-handlers
//

//  ---------------------------------------------------------------------------
//  DATA
//  ---------------------------------------------------------------------------

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Mechanical Keyboard', price: 149, category: 'peripherals' },
  { id: 2, name: 'Ultrawide Monitor', price: 599, category: 'displays' },
  { id: 3, name: 'Ergonomic Mouse', price: 79, category: 'peripherals' },
  { id: 4, name: 'USB-C Hub', price: 45, category: 'accessories' },
  { id: 5, name: 'Standing Desk Mat', price: 35, category: 'accessories' },
  { id: 6, name: 'Webcam HD', price: 89, category: 'peripherals' },
  { id: 7, name: 'Portable SSD 1TB', price: 109, category: 'storage' },
  { id: 8, name: 'Noise-Cancelling Headset', price: 199, category: 'audio' },
];

//  ---------------------------------------------------------------------------
//  UI: HELPERS
//  ---------------------------------------------------------------------------

const ProductRow = memo(function ProductRow({
  product,
  isSelected,
  onSelect,
  style,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: (id: number) => void;
  style: React.CSSProperties;
}) {
  logger.info(`[ProductRow] render: ${product.name}`);

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
      }`}
      style={style}
      onClick={() => onSelect(product.id)}
    >
      <div>
        <Typography.small>{product.name}</Typography.small>
        <Typography.subtle>{product.category}</Typography.subtle>
      </div>
      <Typography.small className="font-mono">
        ${product.price}
      </Typography.small>
    </div>
  );
});

//  ---------------------------------------------------------------------------
//  UI: CORE
//  ---------------------------------------------------------------------------

export default function Demo() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [highlight, setHighlight] = useState(false);

  const toggleProduct = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const total = PRODUCTS.filter((product) =>
    selectedIds.has(product.id)
  ).reduce((sum, product) => sum + product.price, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Codemods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setHighlight((prev) => !prev)}
            >
              Toggle highlight ({highlight ? 'on' : 'off'})
            </Button>
            <Typography.subtle>
              Selected: {selectedIds.size} · Total: ${total}
            </Typography.subtle>
          </div>

          {/* ⚠️ ANTI-PATTERN: inline style object + inline arrow handler */}
          {/* Every render creates new references, so memo(ProductRow) is useless */}
          <div className="space-y-2">
            {PRODUCTS.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isSelected={selectedIds.has(product.id)}
                // ⚠️ Inline arrow: new function reference every render
                onSelect={(id) => toggleProduct(id)}
                // ⚠️ Inline object literal: new object reference every render
                style={{ opacity: highlight ? 1 : 0.85 }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
