# NFT Rarity Inspector

This project allows users to upload a `.zip` file through a dropzone to check how NFTs are presented (displayed in a gallery as cards that can be clicked to read detailed information about them) and their "rarity". The project presents charts showing these data and several other features. Additionally, sorting and filtering options are available to simplify data browsing.

## Usage

To run this project:

```
npm install
npm run dev
```

Important: The `.zip` file must have a specific folder structure to work. It should contain a:

- `metadata` folder with `.json` files or a `.csv` file,
- `metadata` folder within which there's a `json` folder and then the `.json` files or `.csv` file.

Optionally, a `media` folder can be placed in the main directory with images for the individual NFTs. The images should be named to match their JSON counterpart, e.g., if there's an NFT named `1.json`, the image should be named `1.png`.

Allowed image extensions are: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`.

## Technologies

This project was developed with React and Typescript, using some ready-made UI components from shadcn (https://ui.shadcn.com/).
There's no need to set any `.env` variables.

## Contributing

How to contribute to this project:

- Create a fork of this repo on GitHub.
- Clone that forked copy using GitHub.
- Make your changes on a new branch.
- Submit a PR against the main branch of this copy of the git repo.

## Links

- API Reference: REST API [Link](https://docs.hedera.com/hedera/sdks-and-apis/rest-api)
- Swagger UI: Hedera Mirror Node REST API [Link](https://testnet.mirrornode.hedera.com/api/v1/docs/)

## Licence

MIT
