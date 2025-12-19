import { Orders } from "@/components/dashboard/order";
import { getToken } from "@/lib/auth";

export default async function Dashboard() {
  const token = await getToken();

  return <Orders token={token!} />;
}
