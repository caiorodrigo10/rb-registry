<h1 align="center">Roobin Registry</h1>

The Roobin Registry contains project templates and example apps. The easiest way to explore the examples is in the Roobin desktop app under the Discover section. You can download the Roobin desktop app on [Roobin.dev](https://roobin.dev) or browse the open source code in the [Roobin GitHub repository](https://github.com/caiorodrigo10/roobin-app).

## Roobin Core Template

For new projects created with Roobin, the AI agent uses a flexible React and TypeScript template that is optimized for agentic use by LLMs. It is capable of creating robust fullstack applications with client and server functionality. The core framework relies on the following primary libraries:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS V4](https://tailwindcss.com/)
- [oRPC](https://orpc.unnoq.com/)
- [Hono](https://hono.dev/)
- [Zod](https://zod.dev/)

## Contributing

### Development Setup

You'll need:

- **[Node.js](https://nodejs.org/)** ≥ 22.16.0
- **[pnpm](https://pnpm.io/)**

Then:

```shell
# Clone the repository with submodules
git clone https://github.com/caiorodrigo10/rb-registry.git
cd rb-registry

# Install dependencies
pnpm install

# Start an app in development mode
cd apps/micro-chatbot
pnpm run dev

# Create a new app based on a template
pnpm create-app my-new-app --template shadcn
```

## License

Roobin Registry is licensed under the Apache 2.0 license. See [LICENSE](./LICENSE) for more information.
