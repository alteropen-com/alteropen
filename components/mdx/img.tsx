const Img = ({
  src,
  className,
  alt,
}: {
  src?: string
  className?: string
  alt?: string
}) => {
  if (!src || src === "") {
    return null
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        loading="lazy"
        src={src}
        className={`w-full max-w-[686px] rounded-lg cursor-pointer m-0 ${className}`}
        alt={alt ? alt : ""}
      />
      <span>{alt ? alt : ""}</span>
    </div>
  )
}

export default Img
