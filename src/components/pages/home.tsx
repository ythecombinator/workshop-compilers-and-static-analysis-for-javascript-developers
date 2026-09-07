import { Link } from 'react-router-dom';
import { DerivedLabel } from '@components/homebrew/derived-label';
import { FilterSelect } from '@components/homebrew/filter-select';
import { LegacyButton } from '@components/homebrew/legacy-button';
import { PlainInput } from '@components/homebrew/plain-input';
import { Tag } from '@components/homebrew/tag';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';
import Typography from '@components/ui/typography';
import { demos } from '../../demos';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Workshop</Badge>
          </div>
          <Typography.h2 className="text-3xl font-bold">
            Compilers &amp; Static Analysis
          </Typography.h2>
          <div className="flex items-center justify-center gap-2">
            by <DerivedLabel firstName="Matheus" lastName="Albuquerque" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {demos.map((demo) => (
            <Link key={demo.path} to={demo.path} className="block">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-4 space-y-1">
                  <Typography.small className="font-semibold">
                    {demo.title}
                  </Typography.small>
                  <Typography.subtle>{demo.description}</Typography.subtle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Separator />

        {/*
          Dual-purpose live surface:
          - yarn demo:radius-tracker → ui kit vs homebrew
          - yarn demo:react-doctor → eager state (codemod demos), unstable props
            (jscodeshift-custom), setState-in-effect (DerivedLabel)
        */}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Adoption snapshot</CardTitle>
            <Typography.subtle>
              Design-system primitives mixed with leftover homebrew controls —
              the graph Radius Tracker is meant to surface.
            </Typography.subtle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ds-query">Design-system search</Label>
                <Input id="ds-query" placeholder="Filter demos…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legacy-query">Legacy search</Label>
                <PlainInput id="legacy-query" placeholder="Old filter…" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" size="sm">
                Run analysis
              </Button>
              <Button type="button" size="sm" variant="outline">
                Export
              </Button>
              <LegacyButton>Legacy export</LegacyButton>
              <LegacyButton className="border-dashed px-2 py-1 text-xs">
                Reset filters
              </LegacyButton>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">ui/Button</Badge>
              <Badge variant="outline">ui/Input</Badge>
              <Tag>homebrew/Tag</Tag>
              <Tag>homebrew/LegacyButton</Tag>
              <FilterSelect defaultValue="all" aria-label="Filter source">
                <option value="all">All sources</option>
                <option value="target">Design system</option>
                <option value="homebrew">Homebrew</option>
              </FilterSelect>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
