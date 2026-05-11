interface Props {
  productName: string
  imageUrl:    string | null
}

export function ProductImagePanel({ productName, imageUrl }: Props) {
  return (
    <div className="aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="text-center space-y-2">
          <span className="text-8xl">🌱</span>
          <p className="text-xs text-muted-foreground">{productName}</p>
        </div>
      )}
    </div>
  )
}