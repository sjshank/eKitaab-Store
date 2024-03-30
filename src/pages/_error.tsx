import Layout from "@/layouts/root";
import type { NextApiResponse } from "next";
type TStatusCode = {
  statusCode: Number;
};

function Error({ statusCode }: TStatusCode) {
  return (
    <Layout>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </Layout>
  );
}

Error.getInitialProps = ({
  res,
  err,
}: {
  res: NextApiResponse;
  err: any;
}): TStatusCode => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
