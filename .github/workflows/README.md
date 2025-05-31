.github/workflows/README.md
CI/CD Workflows Documentation
This directory contains the GitHub Actions workflows for the CI/CD pipeline of this project. The setup follows a modular design pattern to minimize code duplication while allowing each environment to have its specific behavior.
Workflow Structure
Core Components

shared.yml: The reusable workflow that contains all the common steps for building, testing, and deploying the application.
Environment-specific workflows:

development.yml: Triggers on pushes to the dev branch
staging.yml: Triggers on pushes to the staging branch and successful runs of the development workflow
production.yml: Triggers on pushes to the main branch



Supporting Workflows

security-checks.yml: Handles security scanning (runs on a schedule and for pull requests)
cleanup.yml: Manages resource cleanup like old Docker images and workflow runs

Environment Progression
The project follows a standard environment progression:
Development → Staging → Production
Each environment has different validation requirements:

Development: Basic checks (lint, type check, unit tests)
Staging: All development checks plus smoke tests and E2E tests
Production: All checks with stricter validation and manual approval

Workflow Details
Shared Workflow (shared.yml)
This is a reusable workflow that accepts parameters to customize its behavior based on the environment. Key parameters include:

environment: The target environment (development, staging, production)
run_e2e: Whether to run end-to-end tests
run_smoke_test: Whether to run smoke tests
deploy: Whether to deploy after successful build

The workflow consists of three jobs:

build-and-test: Checks out code, installs dependencies, runs linting, type checking, unit tests, and builds the application.
docker-build: Builds and pushes a Docker image to GitHub Container Registry.
deploy: Deploys the application to the specified environment.

Development Workflow (development.yml)
Runs the shared workflow with:

No E2E or smoke tests
Deployment to the development environment

Staging Workflow (staging.yml)
Runs the shared workflow with:

E2E and smoke tests enabled
Deployment to the staging environment
Can be triggered by:

Pushes to the staging branch
Successful completion of the development workflow



Production Workflow (production.yml)
Runs the shared workflow with:

All tests enabled
Stricter validation
Optional manual approval process
Creates a deployment tag for released versions

Security Checks (security-checks.yml)
Performs security scanning:

npm audit
Dockerfile security validation with Hadolint
Runs on schedule (weekly) and for pull requests

Cleanup (cleanup.yml)
Manages resource cleanup:

Removes old Docker images (keeping the most recent ones)
Cleans up old workflow runs
Can be triggered manually or on schedule (weekly)

Usage and Customization
To modify the CI/CD process:

For changes that affect all environments, edit the shared.yml file
For environment-specific changes, modify the respective environment workflow file
To add new security checks, edit the security-checks.yml file
To adjust cleanup behavior, modify the cleanup.yml file

Future Enhancements
Some features are currently commented out but can be enabled in the future:

SonarCloud integration for code quality analysis
Secret scanning with GitLeaks
Enhanced security scanning

Required Secrets
The workflows expect the following secrets to be set in your GitHub repository:

GITHUB_TOKEN: Automatically provided by GitHub
Environment-specific deployment keys (optional)

