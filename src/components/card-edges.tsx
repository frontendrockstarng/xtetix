/**
 * Four border lines that draw themselves in sequence (top → right → bottom →
 * left) once the parent gets `is-visible`. The parent needs `position: relative`
 * and can set `--card-delay` and `--edge-color`.
 */
export function CardEdges() {
  return (
    <>
      <span className="card-edge card-edge--top" aria-hidden="true" />
      <span className="card-edge card-edge--right" aria-hidden="true" />
      <span className="card-edge card-edge--bottom" aria-hidden="true" />
      <span className="card-edge card-edge--left" aria-hidden="true" />
    </>
  );
}
