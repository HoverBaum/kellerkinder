// Get username from cli and exit, if not provided.
export const requireUsername = () => {
  const username = Deno.args[0]
  if (!username) {
    console.error(`Bitte gib deinen Nutzernamen an.
Beispiel:
deno run --allow-net https://raw.githubusercontent.com/HoverBaum/kellerkinder/main/cli-utils/donations.ts xicanmeow`)
    Deno.exit()
  }
  console.log(`Hi ${username} 👋`)
  return username
}
