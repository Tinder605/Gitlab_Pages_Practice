AGENT.md

Goal

Build and maintain a documentation site using VitePress and deploy it automatically with CI/CD.

This project should:
	•	use Markdown as the main source of content
	•	generate a static site with VitePress
	•	support local preview for editing and review
	•	deploy automatically to GitLab Pages by default
	•	remain easy to switch to GitHub Pages if the repository is hosted on GitHub

⸻

What this project is

This repository is a static documentation site project.

Relationship of the tools:
	•	Markdown (.md): source content
	•	VitePress: converts Markdown into a static HTML documentation site
	•	CI/CD: runs build and deployment automatically on push
	•	GitLab Pages / GitHub Pages: hosting destination for the generated static files

In short:
	1.	write content in Markdown
	2.	build the site with VitePress
	3.	publish the generated static files with Pages

⸻

Expected project structure

Prefer the following structure unless the user explicitly requests otherwise:

.
├─ docs/
│  ├─ index.md
│  ├─ guide/
│  │  └─ getting-started.md
│  └─ .vitepress/
│     └─ config.ts
├─ package.json
├─ .gitlab-ci.yml
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ Dockerfile
└─ AGENT.md

Notes:
	•	Put documentation content under docs/
	•	Put VitePress config under docs/.vitepress/config.ts
	•	Use .vitepress/dist as the build output unless there is a strong reason to change it

⸻

Working rules for the agent

When generating or editing this project, follow these rules:

1. Keep the implementation simple
	•	Prefer the minimum working setup first
	•	Avoid adding unnecessary libraries, themes, or plugins unless requested
	•	Do not introduce a database or server-side runtime

2. Optimize for documentation workflows
	•	Prioritize readability and maintainability
	•	Use clear navigation structure
	•	Keep Markdown files small and topic-based
	•	Prefer one topic per file

3. Prefer reproducible local development
	•	Provide npm scripts for install, dev, build, and preview
	•	Support container-based execution with Docker when practical
	•	Avoid requiring global tool installation when local dependencies are enough

4. Separate hosting concerns from content concerns
	•	Content should stay in Markdown
	•	Build configuration should stay in VitePress config and package scripts
	•	Deployment logic should stay in CI/CD files

5. Make deployment target explicit

If the repository is on GitLab, prioritize GitLab Pages.
If the repository is on GitHub, prioritize GitHub Pages.
Do not mix both deployment paths unless the user explicitly asks for both.

⸻

Default implementation decisions

Unless told otherwise, use the following defaults:
	•	package manager: npm
	•	site generator: vitepress
	•	content root: docs/
	•	VitePress config file: docs/.vitepress/config.ts
	•	local dev command: npm run docs:dev
	•	production build command: npm run docs:build
	•	preview command: npm run docs:preview
	•	Node.js version: LTS

Recommended package.json scripts:

{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}


⸻

VitePress configuration guidance

When generating docs/.vitepress/config.ts, follow these guidelines:
	•	set a clear title and description
	•	define themeConfig.nav and themeConfig.sidebar when content grows
	•	keep the first version minimal
	•	configure base correctly depending on hosting target

base setting rules
	•	For GitHub Pages project site, use:
	•	base: '/<repository-name>/'
	•	For GitHub Pages user/org site, use:
	•	base: '/'
	•	For GitLab Pages, set base according to the actual published path
	•	group/project pages may require a subpath
	•	if the site is published at the domain root, use /

Do not leave base ambiguous when creating deployment-ready code.

⸻

CI/CD policy

For GitLab Pages

Generate .gitlab-ci.yml that:
	•	uses a Node image
	•	installs dependencies with npm ci
	•	runs npm run docs:build
	•	publishes the generated static files as GitLab Pages artifact/output
	•	uses the VitePress build output directory

For GitHub Pages

Generate .github/workflows/deploy.yml that:
	•	runs on push to the main branch
	•	installs dependencies with npm ci
	•	builds with npm run docs:build
	•	deploys the generated site with GitHub Actions Pages workflow

When generating GitHub Pages workflow, assume the repository Pages setting should use GitHub Actions as the source.

⸻

Docker policy

If Docker support is requested, generate a lightweight Dockerfile for local development and validation.

Preferred use cases:
	•	local preview
	•	reproducible build environment
	•	CI-like verification on a local machine

Do not assume Docker is required for Pages hosting itself.
Docker is mainly for build/runtime consistency, not for the final hosting platform.

Example intent:
	•	container starts Node environment
	•	mounts project files
	•	runs VitePress dev server or build command

⸻

Output expectations when asked to scaffold the project

When the user asks to create the project, generate at least:
	1.	package.json
	2.	docs/index.md
	3.	docs/.vitepress/config.ts
	4.	one deployment file:
	•	.gitlab-ci.yml for GitLab Pages
	•	or .github/workflows/deploy.yml for GitHub Pages
	5.	optional Dockerfile if Docker-based local development was requested

Also include:
	•	short setup steps
	•	local run command
	•	deployment notes
	•	where the Markdown content should be added

⸻

Constraints
	•	Do not add unnecessary backend code
	•	Do not use SSR frameworks unless explicitly requested
	•	Do not overengineer the theme in the first version
	•	Do not assume monorepo structure unless specified
	•	Do not hardcode private URLs, tokens, or account-specific values

⸻

Decision guide: GitLab Pages vs GitHub Pages

Use this decision logic:
	•	If the user says GitLab Pages, generate .gitlab-ci.yml
	•	If the user says they want to try with their GitHub repository, generate .github/workflows/deploy.yml
	•	If both are mentioned, ask internally which is the immediate target and prefer the one the user plans to try first
	•	In ambiguous cases, prefer the repository host actually being used for the project

For this user request, the practical first choice is:
	•	VitePress + GitHub repository + GitHub Pages

because the user said they want to try it using their own GitHub.

⸻

Suggested first scaffold for this user

The first generated version should target:
	•	repository host: GitHub
	•	deployment target: GitHub Pages
	•	static site generator: VitePress
	•	content source: Markdown in docs/
	•	deployment: GitHub Actions

Keep the first version minimal and working.
After that, GitLab Pages support can be added as a second deployment path if needed.

⸻

Definition of done

The task is complete when:
	•	npm install succeeds
	•	npm run docs:dev launches local preview
	•	npm run docs:build generates static files successfully
	•	push to the default branch triggers deployment automatically
	•	the published site renders the Markdown content correctly

⸻

Communication style for future edits

When proposing changes to this project:
	•	explain the role of each file briefly
	•	keep instructions step-by-step
	•	distinguish clearly between local preview, build, and deployment
	•	mention any place where base path or repository name must be adjusted

⸻

Next action preference

When asked to continue, scaffold the project in this order:
	1.	package.json
	2.	docs/index.md
	3.	docs/.vitepress/config.ts
	4.	GitHub Pages workflow or GitLab Pages CI file
	5.	Dockerfile if requested