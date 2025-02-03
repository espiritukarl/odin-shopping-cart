// error/Error.tsx
import { Link, useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError();

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>{(error as Error)?.message || "404 PAGE IS MISSING"}</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
