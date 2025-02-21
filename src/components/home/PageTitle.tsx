interface PageTitleProps {
  title: string;
}
export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-3xl font-bold text-gray-900">{title}</h1>;
}
