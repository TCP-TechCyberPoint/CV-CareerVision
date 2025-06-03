import {
  Box,
  Stack,
  Text,
  Button,
  Badge,
  Flex,
  Separator,
} from "@chakra-ui/react";
import {
  MdPerson,
  MdBuild,
  MdPsychology,
  MdSchool,
  MdWork,
  MdFolder,
  MdSettings,
  MdDashboard,
} from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SLIDESHOW_PATHS,
  getSectionStepPath,
} from "@slideshow-form/routes";


interface NavigationItem {
  key: string;
  label: string;
  icon: React.ElementType;
  path: string;
  description: string;
  completionPercentage?: number;
}

interface SidebarNavigationProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const SidebarNavigation = ({
  isCollapsed = false,
  onToggle,
}: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      path: SLIDESHOW_PATHS.DASHBOARD,
      description: "Overview and quick access",
    },
    {
      key: "vitals",
      label: "Vitals",
      icon: MdPerson,
      path: getSectionStepPath("vitals"),
      description: "Basic contact and profile information",
      completionPercentage: 0,
    },
    {
      key: "hardSkills",
      label: "Hard Skills",
      icon: MdBuild,
      path: getSectionStepPath("hardSkills"),
      description: "Technical and programming skills",
      completionPercentage: 0,
    },
    {
      key: "softSkills",
      label: "Soft Skills",
      icon: MdPsychology,
      path: getSectionStepPath("softSkills"),
      description: "Interpersonal and communication skills",
      completionPercentage: 0,
    },
    {
      key: "education",
      label: "Education",
      icon: MdSchool,
      path: getSectionStepPath("education"),
      description: "Academic background and certifications",
      completionPercentage: 0,
    },
    {
      key: "experience",
      label: "Experience",
      icon: MdWork,
      path: getSectionStepPath("experience"),
      description: "Jobs and professional roles",
      completionPercentage: 0,
    },
    {
      key: "projects",
      label: "Projects",
      icon: MdFolder,
      path: getSectionStepPath("projects"),
      description: "Portfolio and side projects",
      completionPercentage: 0,
    },
    {
      key: "preferences",
      label: "Preferences",
      icon: MdSettings,
      path: getSectionStepPath("preferences"),
      description: "Job and work preferences",
      completionPercentage: 0,
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActivePath = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const getCompletionBadge = (percentage?: number) => {
    if (percentage === undefined) return null;

    let colorPalette: "gray" | "red" | "orange" | "yellow" | "blue" | "green" =
      "gray";
    if (percentage > 0 && percentage < 25) colorPalette = "red";
    else if (percentage >= 25 && percentage < 50) colorPalette = "orange";
    else if (percentage >= 50 && percentage < 75) colorPalette = "yellow";
    else if (percentage >= 75 && percentage < 100) colorPalette = "blue";
    else if (percentage === 100) colorPalette = "green";

    return (
      <Badge
        colorPalette={colorPalette}
        variant="subtle"
        size="sm"
        borderRadius="full"
      >
        {percentage}%
      </Badge>
    );
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      h="100vh"
      w={isCollapsed ? "80px" : "280px"}
      bg={{ base: "white", _dark: "gray.900" }}
      borderRight="1px"
      borderColor={{ base: "gray.200", _dark: "gray.700" }}
      shadow="sm"
      transition="width 0.2s ease"
      overflow="hidden"
    >
      <Stack p={4} gap={6} h="full">
        {/* Header */}
        <Flex align="center" justify="space-between">
          {!isCollapsed && (
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={{ base: "gray.800", _dark: "gray.100" }}
            >
              Career Vision
            </Text>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? "→" : "←"}
            </Button>
          )}
        </Flex>

        <Separator />

        {/* Navigation Items */}
        <Stack gap={2} flex="1">
          {navigationItems.map((item) => {
            const isActive = isActivePath(item.path);
            const Icon = item.icon;

            return (
              <Button
                key={item.key}
                variant={isActive ? "subtle" : "ghost"}
                colorPalette={isActive ? "blue" : "gray"}
                size="lg"
                justifyContent="flex-start"
                onClick={() => handleNavigation(item.path)}
                h="auto"
                py={3}
                px={3}
                position="relative"
                _hover={{
                  bg: { base: "gray.100", _dark: "gray.800" },
                }}
              >
                <Flex align="center" justify="space-between" w="full">
                  <Flex align="center" gap={3}>
                    <Icon size={20} />
                    {!isCollapsed && (
                      <Stack gap={0}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          textAlign="left"
                        >
                          {item.label}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={{ base: "gray.600", _dark: "gray.400" }}
                          textAlign="left"
                          lineClamp={1}
                        >
                          {item.description}
                        </Text>
                      </Stack>
                    )}
                  </Flex>

                  {!isCollapsed &&
                    getCompletionBadge(item.completionPercentage)}
                </Flex>

                {/* Active indicator */}
                {isActive && (
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    bottom="0"
                    w="3px"
                    bg="blue.500"
                    borderTopRightRadius="md"
                    borderBottomRightRadius="md"
                  />
                )}
              </Button>
            );
          })}
        </Stack>

        {/* Footer */}
        {!isCollapsed && (
          <>
            <Separator />
            <Box>
              <Text
                fontSize="xs"
                color={{ base: "gray.500", _dark: "gray.400" }}
                textAlign="center"
              >
                Complete your profile to unlock more features
              </Text>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default SidebarNavigation;
