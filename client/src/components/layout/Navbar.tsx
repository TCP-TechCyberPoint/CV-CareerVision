import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import ProfileDropdown from "./ProfileDropdown";
import BaseButton from "@/components/ui/BaseButton";

const Navbar = () => {
  const navigate = useNavigate();
  const  {logout}  = useAuth();

  const links = [
    
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleRedirectEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleClick = (label: string, path?: string) => {
    if(label==="Profile" && path){
        navigate(path);  
    }  
  };

  return (
    <Box bg="gray.800" px={4} position="relative">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir="row-reverse"
      >
        <Box>
          <HStack gap={8} alignItems="center" flexDir="row-reverse">
            <ProfileDropdown onSignOut={handleSignOut} onRedirectEditProfile={handleRedirectEditProfile}  />
       
            {links.map(({ label, path }) => (
               <BaseButton
                  key={label}
                  variant="ghost"
                  color="white"
                  onClick={() => handleClick(label, path)}
                >
                  {label}
                </BaseButton>       
            ))}
          </HStack>
        </Box>

        {/* Logo */}
        <Text fontSize="xl" color="white" fontWeight="bold">
          Career Vision
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
