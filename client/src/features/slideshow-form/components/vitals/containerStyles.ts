 const containerStyles = {
    mt: 8,
    p: 4,
    maxW: "1100px",
    mx: "auto",
    borderWidth: "1px",
    borderRadius: "xl",
    boxShadow: "xl",
    bg: "white",
    position: "relative" as const,
    overflow: "hidden",
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 50%, rgba(147, 51, 234, 0.05) 100%)",
      zIndex: 0,
    },
  };

  export default containerStyles;