export default async function HouseHoldPage({
  params,
}: {
  params: Promise<{ houseHoldId: string }>;
}) {
  const houseHoldId = await params;
  console.log(houseHoldId);
  return (
    <div>
      <p>Jestem na swoim</p>
    </div>
  );
}
