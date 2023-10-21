import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <main>
        <h1>404 NotFound</h1>
        <p>
          無此路由，請確認前往的網址是否正確
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default NotFound;