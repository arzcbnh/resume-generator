# Resumé generator

A script for generating my resumé from a JSON using Mustache templates.

## Usage

```
npm start
```

## Interface

### `data.json`

```ts
{
    "role": string,
    "bio": string,
    "projects": Project[],
    "education": Education[],
    "profile": Profile[],
    "tech": string[]
}
```

### `Project`

```ts
{
    "title": string,
    "url": string,
    "description": string,
    "skills": string,
    "tech": string
}
```

### `Education`     

```ts
{
    "title": string,
    "institute": string,
    "time": string
}
```

### `Profile`

```ts
{
    "title": string,
    "data": string,
    "icon"?: string,
    "url"?: string
},
```
