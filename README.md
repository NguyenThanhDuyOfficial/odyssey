<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[ShadCN-UI]: https://img.shields.io/badge/shadcn_ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[ShadCN-UI-url]: https://ui.shadcn.com/
[Lucide-React]: https://img.shields.io/badge/lucide_react-F56565?style=for-the-badge&logo=lucide&logoColor=white
[Lucide-React-url]: https://lucide.dev/
[Velite]: https://img.shields.io/badge/velite-4B8BBE?style=for-the-badge&logo=velite&logoColor=white
[Velite-url]: https://velite.js.org/
[Catppuccin]: https://img.shields.io/badge/catppuccin-F5C2E7?style=for-the-badge&logo=catppuccin&logoColor=black
[Catppuccin-url]: https://catppuccin.com/
[Vercel]: https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[product-screenshot]: images/screenshot.png
[product-url]: https://odyssey-group.vercel.app/

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">
    <span>Odyssey</span>
  </h3>
  <p align="center">
    Discord Study Group Website
    <br />
    <a href="https://odyssey-group.vercel.app/"><strong>View Demo</strong></a>
    ·
    <a href="https://github.com/NguyenThanhDuyOfficial/odyssey/issues">Report Bug</a>
    ·
    <a href="https://github.com/NguyenThanhDuyOfficial/odyssey/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Screen Shot][product-screenshot]](product-url)

**Odyssey** is a modern landing page and content platform designed for Discord study communities. It serves as a central hub where members can:

- 📖 Access comprehensive guides for using the Discord Community Group
- ✍️ Read and share blog articles about knowledge and experiences
- 👥 Connect with fellow learners in a structured environment

### ✨ Key Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <br />
        <strong>🎨</strong>
        <br />
        <strong>Full Landing Page</strong>
        <br />
        <sub>Modern, responsive design with seamless user experience</sub>
        <br />
        <br />
      </td>
      <td align="center" width="33%">
        <br />
        <strong>📝</strong>
        <br />
        <strong>MDX to HTML</strong>
        <br />
        <sub>Write content in MDX, render as beautiful HTML</sub>
        <br />
        <br />
      </td>
      <td align="center" width="33%">
        <br />
        <strong>🔐</strong>
        <br />
        <strong>Authentication</strong>
        <br />
        <sub>Secure registration, login & role-based access</sub>
        <br />
        <br />
      </td>
    </tr>
  </table>
</div>

<br />

> **⚠️ Important Note:** This project is currently in **demo phase** and under active development. Features may change, and some functionality might be incomplete. Please use with caution and feel free to contribute!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Frontend

- [![Next][Next.js]][Next-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
- [![ShadCN UI][ShadCN-UI]][ShadCN-UI-url]
- [![Lucide React][Lucide-React]][Lucide-React-url]
- [![Velite][Velite]][Velite-url]
- [![Catppuccin][Catppuccin]][Catppuccin-url]

#### DevOps & Deployment

- [![Vercel][Vercel]][Vercel-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- **npm**
  ```sh
  npm install -g npm
  ```

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/NguyenThanhDuyOfficial/odyssey.git
   cd odyssey
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start the development server**

   ```sh
   npm run dev
   ```

   The application will be available at:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)

> **📌 Note:** If you prefer a one-line setup, you can use:
>
> ```sh
> git clone https://github.com/NguyenThanhDuyOfficial/odyssey.git && cd odyssey && npm install && npm run dev
> ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add HomePage
- [x] Add GuidePage
- [x] Add BlogPage
- [ ] User authentication
- [ ] Blog API

See the [open issues](https://github.com/NguyenThanhDuyOfficial/odyssey/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPLv3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

**Nguyen Thanh Duy**  
📧 Gmail: nguyenthanhduyofficial@gmail.com  
🔗 Project Link: [https://github.com/NguyenThanhDuyOfficial/odyssey](https://github.com/NguyenThanhDuyOfficial/odyssey)  
🌐 Live Demo: [https://odyssey-group.vercel.app/](https://odyssey-group.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These resources were helpful during development:

- [Choose an Open Source License](https://choosealicense.com)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [React Icons](https://react-icons.github.io/react-icons/search)
- [Next.js Documentation](https://nextjs.org/docs)
- [Velite Documentation](https://velite.js.org/docs)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
