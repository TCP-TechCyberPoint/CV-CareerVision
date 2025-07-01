import { Box } from "@chakra-ui/react";

interface AiLoaderProps {
    size?: string | number
  }


const AiLoader = ({ size = '5em' }: AiLoaderProps) => {

    return (
      <>
        <style>
          {`
            @keyframes chakraAiSpin {
              0% {
                transform: rotate(-45deg);
              }
              50% {
                transform: rotate(-360deg);
                border-radius: 50%;
              }
              100% {
                transform: rotate(-45deg);
              }
            }
          `}
        </style>
        <Box
          position="relative"
          width={size}
          height={size}
          background="linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%)"
          css={{
            animation: 'chakraAiSpin 3s infinite',
            '&::before': {
              content: '""',
              zIndex: -1,
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%)',
              transform: 'translate3d(0, 0, 0) scale(0.95)',
              filter: 'blur(20px)',
            },
          }}
        />
      </>
    )
  }

  export default AiLoader;