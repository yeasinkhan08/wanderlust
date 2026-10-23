import React from "react";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  return <div>destination details page</div>;
};

export default DestinationDetailsPage;
