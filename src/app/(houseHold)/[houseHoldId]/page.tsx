export default async function HouseHoldPage({
  params,
}: {
  params: Promise<{ houseHoldId: string }>;
}) {
  const houseHoldId = await params;
  console.log(houseHoldId);
  return (
    <div className=" mx-6">
      <p>sd</p>
    </div>
  );
}
