# Hoshi

Hoshi is an opinionated Next.js starter boilerplate designed to provide the essentials for building web applications.

"Hoshi" originates from the Japanese word for "star," and I found it cool to name this boilerplate.

## Why I created Hoshi

Starting a new project can be frustrating because I always have to set up the same things from scratch, and sometimes they don't work properly.

I never found a boilerplate or template that suits my needs, they're either too complicated, over engineered, have a lot of unecessary extra features, I just wanted `simple` and `just works` to start a fresh a project.

So I made Hoshi, to provide me with what I just need to start a new project without wasting time on configuration and choosing what libraries to use.

## What does Hoshi provides

Along with [typescript](https://www.typescriptlang.org/), [prettier](https://prettier.io/) and [eslint](https://eslint.org/), here is a list of the features I implemented for this boilerplate, with some explanation for my choices.

### Authentication

Authentication can be the hardest to implement, but
[lucia](https://lucia-auth.com/) makes it easy. Simply extendable, works in any runtime and supports many databases, no callbacks and hard configuration, just straightforward and typesafe API.

Implemented features:

- Verify request origin in middleware
- Protected routes
- Sign in
- Sign up
- Sign out
- Reset password flow
- Verify email flow

Todo:

- [ ] Implement sending emails (currently just console logging)
- [ ] Add option to resend verification emails
- [ ] GitHub and Google authentication flow

### Typesafe API

Next.js makes is easy to create API routes, but they're not typesafe and it requires some extra steps to make them typed. Server actions are also an option, but sometimes they make me lost when dealing with them on the client side and migrating their logic to a backend framework is a pain. So implementing [tRPC](https://trpc.io/) seemed like a good idea, mostly for providing type safety, easier mutations, context, middleware, grouped logic, and it just works client and server side, with a [react-query](https://tanstack.com/query/latest) integration for better data handeling, refetching, mutating and simply a better user and developer experience.

### Design System

I just want control over components, and [shadcn/ui](https://ui.shadcn.com/) is honestly the best. However, (call me crazy), I don't like the idea of having a ton of packages installed in my project. If I can code it myself, I will. So I created just a few components inspired by shadcn/ui, which are mainly the essential components used in the UI (button, link, input, etc...) while trying to not use packages if possible. I just copy/paste the code and edit it to my needs and satisfaction. I know other components will require me to install packages, but their use vary from project to another, so I didn't include them.

And not to forget [tailwindcss](https://tailwindcss.com/), my all time favorite styling method.

### Form Validation

Client side form data validation is a must in my opinion, and what is better than a combination of [react-hook-form](https://react-hook-form.com/) and [zod](https://zod.dev/), with well handled and displayed error messages.

### ORM

[Drizzle](https://orm.drizzle.team/) just feels great for me. SQL like syntax, fast performance, edge support, drizzle kit and studio. I love it, works for me. I use it with MySQL but moving to another database is pretty easy.

---

I won't dive into my choices for prettier and eslint configurations since they are easily customizable, but I know for sure that configuring and finding what suits you takes some time, and myself hate to deal with them. So the way I configured them in this boilerplate works good for me and hope it'll save you some hassle.

Same thing applies to typescript import paths, folder structure, naming conventions... For everyone their preferred way, but this is the way I prefer organizing my project. Feel free to dive a bit into the boilerplate and give me your opinion.

## Usage

in progress...

## Contributing

in progress...
