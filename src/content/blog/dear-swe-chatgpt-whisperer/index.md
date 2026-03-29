---
title: "Dear SWE, ChatGPT Whisperer, and aspiring MLE"
description: "Thoughts on the evolving landscape of machine learning engineering."
date: "Mar 13 2024"
---

*Originally published on [Substack](https://mukulsurajiwale.substack.com/p/dear-swe-chatgpt-whisperer-and-aspiring).*

Yes, LLMs like GPT4, Gemini, Claude, <insert latest popular open-source LLM>, are great.

However, as much as they, and the general hype around them, will try to fool you into thinking they can solve any problem you throw at them, they can't. Have you heard of the No Free Lunch principle? If you're already familiar with the concept, this article might not offer much new information. Feel free to move along :)

The No Free Lunch theorem in machine learning boils down to a sobering reality: there's no single algorithm that always outperforms all others across every possible problem.

Why does this principle matter? Here's what it implies:

- **The Importance of Context:** The best algorithm is fundamentally tied to the specific problem you're trying to solve. What works wonders in one domain could be terrible in another.

- **No Silver Bullet:** Don't be fooled by the hype around any single algorithm or technique. There is no magical solution that guarantees success across all machine learning tasks.

- **Domain Knowledge is Key:** Understanding the nature of your data and the problem you're addressing will guide you in making informed decisions about potential models and techniques.

So what are some use cases where LLMs tend to fall short compared to more traditional machine learning models?

**1. Tabular Data with Primarily Numeric Features**

- **Problem Types:** Predicting customer churn, forecasting sales based on historical data, classifying financial transactions as fraudulent or not.

- **Why LLMs Struggle:** LLMs are designed to excel with text. Tabular data often lack the rich contextual relationships LLMs thrive on.

- **Better Alternatives:** Tree-based models (Decision Trees, Random Forests, XGBoost), traditional classification algorithms (Logistic Regression, Support Vector Machines), or Neural Networks tailored for numerical data.

**2. Tasks Requiring Precise Numerical Outputs**

- **Problem Types:** Calculating precise dosages for medications, predicting stock prices, estimating time-to-completion for engineering projects.

- **Why LLMs Struggle:** LLMs are probabilistic—great for generating text, but less so for pinpointing exact numerical values within specific error margins.

- **Better Alternatives:** Regression models (Linear Regression, Polynomial Regression, Support Vector Regression, etc.)

**3. Real-time, Low-Latency Decision-making**

- **Problem Types:** Fraud detection during online transactions, high-speed algorithmic trading, embedded systems with limited resources.

- **Why LLMs Struggle:** LLMs are often large and computationally expensive. Processing time can be significant, making them unsuitable for super-fast responses.

- **Better Alternatives:** Simpler, lightweight models like Decision Trees or carefully optimized Neural Networks may strike a better balance between speed and accuracy.

As you can see there are still a plethora of use cases for good old fashion ML.

In my experience interviewing MLE candidates, asking questions regarding simple yet fundamental ML concepts have served as a good initial screener for separating those with a strong foundation from those whose knowledge is built on shaky footing.

So, if you're looking to make the transition from SWE to MLE, here are some important concepts you need to understand if you want to avoid looking like a total [noob](https://www.merriam-webster.com/dictionary/noob).

## What is the i.i.d assumption?

The i.i.d assumption in machine learning, which stands for "independent and identically distributed," is a foundational concept that plays a crucial role in the theory and practice of machine learning algorithms. This assumption has several important implications:

- **Simplification of Models**: By assuming that data points are independent and identically distributed, we can simplify the problem of modeling data. It means that each data point is drawn from the same probability distribution as all other data points and is independent of them. This simplification allows for the development of statistical models that do not need to account for potential correlations between data points, making it easier to predict outcomes based on those models.

- **Generalization Ability**: The i.i.d assumption is crucial for the generalization of models. In machine learning, we want our models not only to perform well on the data they were trained on but also to generalize well to new, unseen data. If the training and test data are both i.i.d. from the same distribution, we can be more confident that a model that performs well on the training data will also perform well on the test data and in real-world scenarios.

- **Statistical Theory and Guarantees**: Many statistical learning theories and guarantees, such as the Law of Large Numbers and the Central Limit Theorem, rely on the i.i.d assumption. These theories provide the foundation for various machine learning algorithms, enabling practitioners to make predictions about the behavior of these algorithms and their convergence properties.

- **Evaluation and Validation**: The i.i.d assumption underpins many common practices in machine learning, such as cross-validation and the splitting of data into training, validation, and test sets. These practices assume that since the data are i.i.d., splitting the data in this way provides a reliable estimate of how well the model will perform on unseen data.

That being said, its important to note that the i.i.d assumption is not always valid in real-world applications. For example, imagine you are working with time-series data series data such as stock prices. I thinks its fair to say that the price of a stock *p(t)* is to some degree influence by its price *p(t-1)*. If thats not the case, I'd be really stressed out if I was a momentum trader!

In any case, being aware of when the i.i.d assumption is or isn't applicable is really important because it allows you to more easily prune the space of ML models to find the one that is be best suited for your use case.

## Supervised vs. Unsupervised Learning: What's the Difference?

**Supervised Learning:** Think of this like learning with a teacher. You give the model labeled data – both the questions and the answers – and it learns to make predictions. For example, you could train a model to identify different dog breeds by showing it pictures with labels like "Labrador," "Poodle," and so on.

More specifically, supervised learning aims to learn a mapping from inputs to outputs, making predictions or decisions based on new, unseen data. It is used for classification (categorizing into predefined classes) and regression (predicting a continuous value) tasks.

One important thing to note is that the quality and quantity of your labeled data significantly impacts the performance of your model. Garbage in equals garbage out.

**Unsupervised Learning:** Here, it's more like exploring uncharted territory. You only give the model the questions, and it tries to figure out patterns on its own. Think of it like sorting socks without knowing which pairs match–the machine figures out the groups based on similarities.

Said more concretely, unsupervised learning focuses on identifying the underlying structure or distribution in data. It is used for clustering (grouping similar instances), dimensionality reduction (simplifying data without losing valuable information), and association (discovering rules that describe parts of the data).

If you don't have labeled data, or rather very few labeled samples, then you are dealing with an unsupervised learning problem. The challenge with unsupervised learning is in interpreting the results of your model. Ensuring they are meaningful, consistent, and sufficiently specific can be be challenging.

Generally speaking, supervised learning problems are easier to solve than unsupervised ones.

**Pro-tip**, if you are an MLE, make sure your PM understands the difference between supervised and unsupervised learning problems. I've found it to be good way of having fewer "Give me five years and a phd." type of projects being brought onto my teams roadmap. I want to be clear, though. I am not suggesting that you flag an unsupervised learning problem as impossible and waste of your time. All I am saying is that you need to approach it with more more caution, a bit of paranoia, and the ability to walk away if needed.

## The Bias-Variance Trade-off: Finding the Sweet Spot

**Bias:** Imagine you're trying to shoot arrows at a target, and all your arrows land consistently off-center. That's bias – your model keeps making a similar kind of error. This often happens because your model is too simple.

**Variance:** Now picture your arrows scattered all over the target. This is high variance. Your model is paying too much attention to little details in the training data and can't reliably generalize to new information.

**The Goldilocks Zone:** The goal is to find the model that's "just right" – not too biased, not too variant. Techniques like regularization and cross-validation help with this delicate balance.

## The Importance of Cross-Validation

Think of cross-validation as splitting your dataset into smaller groups and having your model take several mini-tests. This helps ensure your model isn't just memorizing the answers from a single practice exam. Instead, it learns to be adaptable to new situations. Remember the Bias vs Variance tradeoff? Well this is one good way to find the right balance.

More specifically it is useful for:

- **Preventing Overfitting:** A model can perform amazingly well on the data it was trained on but fail to generalize to new, unseen examples. Cross-validation helps detect overfitting by giving a more realistic estimate of how your model will likely perform in a real-world setting.

- **Model Selection:** Imagine you want to compare different types of models (e.g., linear regression vs. decision tree). Cross-validation helps you select the best performing model for your task by providing a more consistent comparison across several data splits.

- **Hyperparameter Tuning:** Most machine learning models have adjustable parameters (like the regularization strength in L1/L2 regularization). Cross-validation aids in finding the optimal hyperparameter values that balance out underfitting and overfitting.

**Steps for Cross-Validation**

Let's focus on the common "k-fold" cross-validation technique:

- **Data Shuffle:** Randomly shuffle your dataset to avoid any pre-existing order influencing results.

- **Splitting:** Divide your data into 'k' equal-sized segments, or "folds." A common choice for 'k' is 5 or 10.

- **Iterative Training & Testing:** For each of the 'k' folds:
  - Designate one fold as your test set.
  - Combine the remaining 'k – 1' folds to form your training set.
  - Train your model on the training set.
  - Evaluate the model's performance on the held-out test set.
  - Store the evaluation metric (e.g., accuracy, F1 score).

- **Performance Average:** After all 'k' iterations, calculate the average of the stored evaluation metrics. This average gives a more reliable representation of your model's generalization ability.

## L1 vs. L2 Regularization

These are techniques to prevent overfitting (like a model memorizing a specific practice test).

**L1 Regularization (Lasso)**

- **Penalty:** Adds the absolute value of the magnitude of each model coefficient to the loss function.

- **Sparsity:** L1 regularization has a cool trick: it drives some coefficients to zero. This essentially eliminates features that are less important, performing automatic feature selection.

- **Robustness:** L1 is less sensitive to outliers in the data.

**L2 Regularization (Ridge)**

- **Penalty:** Adds the square of the magnitude of each coefficient to the loss function.

- **Shrinkage:** L2 tends to shrink all coefficients, but doesn't fully eliminate any to zero. It encourages smaller, more distributed coefficients.

- **Correlated Features:** L2 handles situations with highly correlated features better than L1.

**When to Choose Which**

- **Interpretability:** If you absolutely need to know which features are the most important, L1 is your winner because of its feature selection property.

- **High-dimensional data:** When you have a massive number of features, L1 can be a lifesaver, helping to reduce the model complexity.

- **Outliers:** If your data has significant outliers, L1's robustness can give better results.

- **Correlated Features:** If several of your features are strongly correlated, L2 regularization is often the preferable option.

## Feature Scaling: Why Size Matters

Imagine you are trying to build a model to predict the price of a house based on a set of features. Lets say two the of the features are "square footage" and "number of bedrooms". Assuming the house was designed by a sane person and follows safety codes, square footage is almost always going to be an order of magnitude to half an order of magnitude larger than the number of bedrooms. Furthermore, the model has no internal concept of what square footage or the number of bedrooms mean. All it sees as input for those two features is their raw numerical values.

So, does it make sense to just pass them into the model as is?

No, it doesn't. If one feature is on a scale of 0-1, and another is in the thousands, some algorithms can freak out. Scaling brings features into similar ranges, so your model doesn't give undue weight to any single feature.

Here are some commons methods to scale your data.

**1. Min-Max Scaling (Normalization)**

- **Description:** Scales and transforms features to a given range, typically 0 to 1. The transformation is done by subtracting the minimum value of the feature and then dividing by the range of the feature.

- **Use Cases:** Useful when you need values in a bounded interval. However, it is sensitive to outliers.

**2. Standardization (Z-score Normalization)**

- **Description:** Scales features so that they have the properties of a standard normal distribution with a mean of 0 and a standard deviation of 1. It subtracts the mean value of the feature and then divides by the standard deviation.

- **Use Cases:** Standardization is not bound to a specific range, which might be a problem for some algorithms that require input data within a bounded interval. It is less affected by outliers compared to min-max scaling.

**3. Robust Scaling**

- **Description:** Uses the median and the interquartile range (IQR) for scaling, thus mitigating the influence of outliers.

- **Use Cases:** Particularly beneficial when your data contains many outliers or is not normally distributed.

## Overfitting: The Machine Learning Trap

Imagine your model aces a practice test, but bombs the real exam. That's overfitting. It has memorized the practice questions, not learned the underlying concepts.

Here's how you know if your model is overfitting.

**Huge Gap Between Training and Testing Accuracy:** If your model nails the training data with 99% accuracy but performs poorly on a separate test set (say, 65% accuracy), overfitting is likely the culprit.

**High Variance:** If your model's performance fluctuates wildly across different cross-validation folds, this suggests that it is too sensitive to the specific data it's trained on and may not generalize well.

**Prevention Techniques**

Here are a few go-to strategies for tackling overfitting:

- **Regularization (L1/L2):** The classic! Adding penalties to the model's cost function to discourage overly complex models helps it focus on the big-picture trends.

- **Early Stopping:** Training neural networks can sometimes feel like watching an overeager student. Early stopping monitors your model's validation set performance and halts training once performance starts to decline, preventing it from over-memorizing the training data.

- **Data Augmentation:** Artificially create more training examples by slightly transforming existing data (rotating images, adding noise). This makes your model more robust to minor variations.

- **Simpler Models:** If things get out of hand, sometimes opting for a slightly less complex model (e.g., linear regression over a complex neural network) can naturally limit overfitting tendencies.

- **Ensemble Techniques:** Combining multiple weaker models (like in bagging or boosting) can create a super-model that is less susceptible to overfitting than any individual model.

**Detection Techniques**

Besides the red flags mentioned earlier, here are ways to detect overfitting more proactively:

- **Visualization:** Plotting a graph of training and validation accuracy over time (or the number of training iterations) can help visualize an increasing gap.

- **Performance Metrics:** Focus on metrics that are more robust to overfitting. Accuracy can be misleading; instead, consider precision, recall, F1-score, or AUC-ROC

## Dealing with Imbalanced Datasets

Classification based machine learning problems tend follow a particularly annoying characteristic: often times the category you are trying to predict, the category that you care the most about, almost most always tends to have the fewest number of samples.

For example, what if you're training a model to detect a rare disease, but most of your data is healthy patients? Lets put some number to that scenario. Lets say 99% of your samples are tagged as "negative" and the remaining 1% are tagged as "positive". If you are using accuracy as your performance metric you would likely be mislead into believing your model is performing better than it is: predicting "negative" all time would get you a model thats 99% accurate!

Here are some ways to deal with imbalanced data.

- **Resampling Techniques:** Oversample the rare class or undersample the common one to even the playing field.

- **Synthetic Data Generation (SMOTE):** Techniques like SMOTE create realistic-looking synthetic data points for the minority group. This can get complicated and shouldn't be your first approach.

- **Cost-sensitive Training:** Tell the model to pay more attention to the rare class by imposing heavier penalties for misclassifying them.

- **Ensemble Methods:** Stack multiple models together to make a prediction. Some models models might, inherently, be better at detecting the minority class. Combing the outputs from multiple models will may yield a more balanced prediction.

- **Focusing on the Right Metrics:** Accuracy might not tell the whole story with imbalanced data. Look at precision, recall, and the F1 score instead.

- **Use of Anomaly Detection Techniques:** Sometimes, treating your problem like an anomaly detection issue can help, especially if the minority class is really rare.

- **Get More Data:** If possible, the best solution is often just getting your hands on more data!

If you've made it this far, go and reward yourself with a cookie! I know the concepts covered in the post are quite boring compared to all the buzz going on in the world of LLMs. However, I think its important to slow down, step back, and make sure you still have good grasp of some of the fundamental concepts in ML. If you are looking the make the jump from SWE to MLE, the concepts I've covered here are table stakes.
