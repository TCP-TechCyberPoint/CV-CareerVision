import { Menu, Portal } from "@chakra-ui/react";
import BaseButton from "@/ui/BaseButton";

type ProfileDropdownProps = {
  onSignOut: () => void;
};

const ProfileDropdown = ({
  onSignOut,
}: ProfileDropdownProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
      <BaseButton
                    key={"profile"}
                    variant="outline"
                    color="white"
                    colorScheme="whiteAlpha.900"
                    borderColor="whiteAlpha.900"
                    fontWeight="bold"
                    fontSize="lg"
                    _hover={{
                      bgColor: "whiteAlpha.900",
                      color: "blue.700",
                      borderColor: "whiteAlpha.900",
                    }}
                    
                  >
          Profile
        </BaseButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="sign-out" onClick={onSignOut}>
              Sign Out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default ProfileDropdown;
