import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useProjectsCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const projectsData = formData.projects;

  const handleClick = () => {
    navigate(getSectionStepPath("projects"));
  };

  // Calculate completion based on projects data
  const calculateCompletion = () => {
    if (!projectsData || projectsData.length === 0) return 0;

    const projects = projectsData;
    let totalFields = 0;
    let filledFields = 0;

    projects.forEach((project) => {
      const requiredFields = [
        project.projectName,
        project.description,
        project.projectTech?.length > 0 ? "tech" : "",
      ];
      totalFields += requiredFields.length;
      filledFields += requiredFields.filter(
        (field) => field !== undefined && field !== null && field !== ""
      ).length;
    });

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  // Get completion color based on percentage
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 75) return "green";
    if (percentage >= 50) return "blue";
    if (percentage >= 25) return "orange";
    return "red";
  };

  // Extract unique technologies from all projects
  const extractTechnologies = () => {
    if (!projectsData) return [];

    const allTech = projectsData.flatMap(
      (project) => project.projectTech || []
    );
    return [...new Set(allTech)];
  };

  // Process projects data for display
  const processedData = {
    totalProjects: projectsData?.length || 0,
    liveProjects: projectsData?.filter((p) => p.projectLink).length || 0,
    githubRepos:
      projectsData?.filter((p) => p.projectLink?.includes("github")).length ||
      0,
    featuredProjects: projectsData?.map((p) => p.projectName).slice(0, 2) || [],
    technologies: extractTechnologies(),
  };

  const completionPercentage = calculateCompletion();

  return {
    projectsData,
    processedData,
    handleClick,
    getCompletionColor,
    completionPercentage,
  };
};
