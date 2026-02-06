/**
 * Demo Route Data
 * Pre-configured routes for testing without Google Maps API
 */

import type { RouteMetadata } from '@/lib/types/route';

export const demoRoutes: RouteMetadata[] = [
  {
    id: 'demo-nyc-dc',
    userId: 'demo-user',
    origin: { lat: 40.7128, lng: -74.0060 },
    destination: { lat: 38.9072, lng: -77.0369 },
    originName: 'New York City, NY',
    destinationName: 'Washington, DC',
    distance: 361000, // 361 km in meters
    duration: 14400, // 4 hours in seconds
    encodedPolyline: 'aqcwFxbhbMvC~@xErBhD|AxBv@|Cl@~Dh@lEl@`El@fDn@rCp@~Bp@|BbAbBbAjBtAdBfBpBjCnCdDfDvDhEpD`EzDlE~D`FbEhFfEdFxDjFtDnFhDnFbDnFpClFdCnF~BnFrBlFfBlFxAvEfAvEzAvDlAvDxAjDfArCv@jCn@bCf@~Bd@vBd@pBd@lBf@hBn@dBv@bBdAbBpAbBhBhBjCfCpDfDvEjExFhFfGxFfGfGfGnGdGtGbGxGbGzGfGzGlGxGpGtGtGnGxGfGzGdG~GbGbH`GdHbGfH`GhH`GjH^lH`GnH`GpHbGpH`GrHbGtH`GvHbGvHbGyHbG{HdGzHdG|HdG~HfG~HfGaIfGcIfGeIfGgIfGiIfGkIfGmIfGoIfGqIfGsIfGuIfGwIfGyIfG{IfG}IfGgJvGkJxGmJzGoJzGqJzGsJ|GuJ~GwJ~GyJ~G{J~G}JbH_KdHaKdHcKdHeKfGgKhGiKhGkKjGmKjGoKlGqKlGsKlGuKnGwKnGyKnG{KpG}KpG_LrGaLrGcLrGeLtGgLtGiLtGkLvGmLvGoLvGqLxGsLxGuLxGwLzGyLzG{L|G}L|G_M|GaM~GcM~GeM~GgMbHiMbHkMdHmMdHoMdHqMfHsMfHuMfHwMhHyMhH{MhH}MjHaNjHcNlHeNlHgNnHiNnHkNnHmNpHoNpHqNrHsNrHuNrHwNtHyNtH{NtH}NvH_OvHaOxHcOxHeOxHgOzHiOzHkOzHmO|HoO|HqO|HsO~HuO~HwO~HyObI{ObI}OdI_PdIaPdIcPfIePfIgPhIiPhIkPjImPjIoPjIqPlIsPlIuPnIwPnIyPnI{PpI}PpI_QrIaQrIcQrIeQtIgQtIiQtIkQvImQvIoQxIqQxIsQxIuQzIwQzIyQzI{Q|I}Q|I_R|IaR~IcR~IeR~IgRbJiRbJkRdJmRdJoRdJqRfJsRfJuRhJwRhJyRhJ{RjJ}RjJ_SlJaSlJcSlJeSnJgSnJiSpJkSpJmSpJoSrJqSrJsStJuStJwStJySwJvR{JwRaK', 
    tripName: 'NYC to DC Road Trip',
    notes: 'Historic route along I-95',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-la-sf',
    userId: 'demo-user',
    origin: { lat: 34.0522, lng: -118.2437 },
    destination: { lat: 37.7749, lng: -122.4194 },
    originName: 'Los Angeles, CA',
    destinationName: 'San Francisco, CA',
    distance: 615000, // 615 km in meters
    duration: 21600, // 6 hours in seconds
    encodedPolyline: 'wpqtEhwzsNy@zAoBrD{BbEkCnEmC|DoCjEgDtFoDbG}DhG_EnG{DpGwD~FoDnG}DxF{D~FyDfGwDnGsDvGoDzGkD~G_DbHqChHcChH{BhHmBhHaBhHuAhHgAhHy@hHk@hH_@hHQhHEhHFhHTfHh@fHv@fHdAfHrAdHbBdHpBbH~BbHlC`HzC^HhD|GxDzGfEzGvE~GdFbHrFfHbGlHpGrH~GxHlH~HzHdIhIfIvIlIbJrInJxItJzIzJ|I`K~IfKbJlKfJrKjJxKnJ~KrJdLvJjLzJpL~JvLbKzLhK`MlKfMpKlMtKrMxKxM|K~MbLdNfLjNlLpNrLvNvL|NzLbO~LhObMnOfMtOjMzOnM`PrMfPvMlPzMrP~MxPbNzPfN`QjNfQnNlQsNrQwNxQ{N~Q_OdRcOjRgOpRkOvRoO|RsObS',
    tripName: 'LA to SF Coast Drive',
    notes: 'Beautiful Pacific Coast Highway route',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-miami-orlando',
    userId: 'demo-user',
    origin: { lat: 25.7617, lng: -80.1918 },
    destination: { lat: 28.5383, lng: -81.3792 },
    originName: 'Miami, FL',
    destinationName: 'Orlando, FL',
    distance: 378000, // 378 km in meters
    duration: 12600, // 3.5 hours in seconds
    encodedPolyline: 'kxqaF~wvhN}BmAeDoBgEkCiEaDgEeD_EcDyDaD{C_DuC_DqCaDkCkDgCqDcCwD_CyD{B{DwB}DsB_EoBeEmBgEiBiEeBkE_BmE{AoExAqEtAsEpAuElAwEhAyEdA{E`A}E|@_ExA}@aE|@cEx@eEt@gEp@iEl@kEh@mEd@oE`@qE\\sExEu@zEq@|Eo@~Ek@`Fg@bFe@dFa@fF_@hF[jFWlFUnFQpFOpFMrFKtFGvFEvFCxFAzF?|F@~FB`GD`GFbGHdGJfGLhGNjGPjGRlGTnGVpGXrGZtG\\tG^vG`@xGb@zGd@|Gf@~Gh@~Gj@`Hl@bHn@dHp@fHr@hHt@jHv@lHx@nHz@pH|@rH~@tHbAtHdAvHfAxHhAzHjA|HlA~HnA`IpAbIrAdItBfIvBhIxBjIzBlI|BnI~BpIbCrIdCtIhCvIjCxIlCzInCzIpC|IrC~ItC`JvCbJxCdJzCfJ|ChJ~CjJbDlJdDnJfDpJhDrJjDtJlDvJnDxJpDzJrD|JtD~JvD`KxDbKzDdK|DfK~DhKbEjKdElKfEnKhEpKjErKlEtKnEvKpExKrEzKtE|KvE~KxE`LzEbL|EdL~EfLbFhLdFjLfFlLhFnLjFpLlFrLnFtLpFvLrFxLtFzLvF|LxF~LzF`M|FbM~FdMbGfMdGhMfGjMhGlMjGnMlGpMnGrMpGtMrGvMtGxMvGzMxG|MzG~M|G`NbHbNdHdNfHfNhHhNjHjNlHlNnHnNpHpNrHrNtHtNvHvNxHxNzHzN|H|N~H~NbIbOfIdOfIfOpIhOrIjO',
    tripName: 'Miami to Orlando',
    notes: 'Florida Turnpike route',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
