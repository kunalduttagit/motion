# [Motion : Hybrid Movie Recommendor System](https://www.motion.kunaldutta.me)

## Introduction
The project at hand involves the development and implementation of a sophisticated hybrid recommender system, leveraging both content-based and collaborative filtering techniques. This system is designed to provide personalized movie recommendations by analyzing a custom-curated dataset of 10,000 popular movies. The project encompasses two main components: first is exploring the various machine learning methodologies employed and second is a web application built using Next.js and TypeScript, which serves as the user interface for the recommender system.

## Machine Learning Models
This project aims to contribute to this field by developing a hybrid recommender system that combines the strengths of content-based filtering, which uses Natural Language Processing (NLP) techniques, and collaborative filtering, which employs neighbourhood based algorithms, matrix factorization and deep learning models.

| **Component**                 | **Technique**        | **Description**                                                                 |
|-------------------------------|----------------------|---------------------------------------------------------------------------------|
| **Content-Based Filtering**   | TF-IDF               | Uses term frequency-inverse document frequency to evaluate the importance of words in documents. |
|                               | Word2Vec             | Converts words into vector representations to capture semantic meanings.         |
| **Collaborative Filtering**   | KNN                  | Uses k-nearest neighbors to find similar users or items based on ratings.        |
|                               | SVD                  | Applies singular value decomposition for matrix factorization to uncover latent features. |
|                               | NCF                  | Utilizes neural collaborative filtering, a deep learning approach for capturing complex user-item interactions. |

<hr />

## Run on your system
1. Open your terminal or command prompt.

2. Clone the repository using the following command:
   ```bash
   git clone https://github.com/kunalduttagit/motion.git
   ```

3. Navigate into the cloned directory:
   ```bash
   cd motion
   ```

4. Create a new file named `.env.local` in the root directory of the project:
   ```bash
   touch .env.local
   ```

5. Open the `.env.local` file in a text editor and add the following environment variables:
   ```bash
   MONGO_URI=your_mongodb_uri
   TOKEN_SECRET=your_token_secret
   DOMAIN=your_domain
   ```
   Replace the placeholders with your actual values.


6. Install the project dependencies:
   ```bash
   npm i
   ```

7. Once the installation is complete, start the development server:
   ```bash
   npm run dev
   ```

8. Open your web browser and navigate to `http://localhost:3000` to view the application.


## License
**Motion** is licensed under a custom license. By using, copying, modifying, or distributing this software, you agree to the following terms:

1. You are permitted to use, copy, modify, and distribute this software for personal and educational purposes only.

2. Commercial use of this software is strictly prohibited without explicit written permission from the author.

3. If you use this software in your own projects or research, you must provide proper attribution to the original author.

4. Any distribution of this software or derivative works must include this license and copyright notice.

5. To request permission for commercial use or for any questions regarding licensing, please contact:
   kunalduttaedu@gmail.com

Copyright © Kunal Dutta 2024

**Motion** is licensed under the Creative Commons Non-Commercial (CC BY-NC) license. This means you are free to:

- **Clone and use** the project for personal and educational purposes only.
- **Give appropriate credit** to the original author.

For any other use, including commercialization, you must first obtain permission by contacting mailto:kunalduttaedu@gmail.com.

**Copyright © Kunal Dutta 2024**