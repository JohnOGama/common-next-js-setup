import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui";

const AppEmpty = ({
  title,
  description,
  icon,
  button,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  button: React.ReactNode;
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        <EmptyContent>{button}</EmptyContent>
      </EmptyHeader>
    </Empty>
  );
};

export default AppEmpty;
