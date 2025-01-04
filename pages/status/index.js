import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <DataBase />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando ...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }
  return <div>Última Atualização: {updatedAtText}</div>;
}

function DataBase() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let dataBaseStatus = "Carregando ...";

  if (!isLoading && data) {
    dataBaseStatus = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões Maximas:
          {data.dependencies.database.max_connections}
        </div>
        <div>
          Conexões Abertas: {data.dependencies.database.opened_connections}
        </div>
      </>
    );
  }
  return (
    <>
      <h2>DataBase</h2>
      <div>{dataBaseStatus}</div>
    </>
  );
}
