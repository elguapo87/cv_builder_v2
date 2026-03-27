type Props = {
    title?: string;
    description?: string;
    className?: string;
};

const Title = ({ title, description, className }: Props) => {
  return (
    <div className={`text-center mt-6 text-stone-100 ${className ?? ""}`}>
        <h2 className="max-md:max-w-[320px] text-3xl sm:text-4xl font-medium">{title}</h2>
        <p className="max-md:max-w-[320px] max-w-2xl mt-4 text-slate-200">{description}</p>
    </div>
  )
}

export default Title
