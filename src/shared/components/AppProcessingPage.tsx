import { SpinnerCustom } from "./ui";

const AppProcessingPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      <SpinnerCustom />
      <h1>{title}</h1>
      <p className="text-xs">{description}</p>
    </div>
  );
};

export default AppProcessingPage;
