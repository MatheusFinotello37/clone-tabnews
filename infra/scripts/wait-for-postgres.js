const { exec } = require("node:child_process"); //module to be able to execute commands within a script.

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n✅ Conexão realizada com sucesso!\n");
  }
}

process.stdout.write("\n\n ⚠️  Aguardando Postgres aceitar conexões!");
checkPostgres();
