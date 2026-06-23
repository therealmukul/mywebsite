---
title: "Open Weights Are Not Open Source"
description: "Why 'we trained our own model' often means tuning someone else's open-weight LLM, not building one from scratch."
date: "Jun 03 2026"
---

A lot of AI marketing lives in the gap between what the public hears when a company says “we trained our own model” and what the company actually did.

Most people hear that and picture a homegrown LLM (original architecture, original training run, original dataset, etc). But in practice, a lot of “our model” announcements mean something narrower. More often than not, it means the company started with someone else’s open-weight model, tuned it, wrapped it in a product, and gave the result a new name.

Don't get me wrong, that is still real work. Tedious, hard work, actually. The tuning, data, serving, product wrapper, and UX can be the whole reason the thing is useful. But it does mean “our model” often means “our version of someone else’s base model”, and that has real implications.

Take Cursor's Composer 2 model launch as a recent example. It launched to over one million daily active users, and, amazingly, was at near parity with state of the art frontier models at roughly one-eighth the price. The launch materials led many users to assume Cursor had trained the model in house entirely from scratch. However, within a couple hours after the launch, a developer discovered that Cursor had built the model on top of a Chinese model called Kimi K2.5.

Users felt they were misled and criticism started bubbling up on Linkedin, Reddit, and other such platforms. The core grievance wasn't that Cursor used an "open-source" base model. That's pretty standard outside of the frontier labs. The problem was that they built their model on top of Kimi K2.5 without proper disclosure, and that, understandably, left a bad taste in users' mouths.

After much drama, Cursor's co-founder Aman Sanger [admitted](https://x.com/amanrsanger/status/2035079293257359663) "It was a miss to not mention the Kimi base in our blog from the start. We'll fix that for the next model."

The point is not that Cursor did no real work. I use it, it’s been a game changer, and Composer 2 is quite good. The point is that the base model matters, and users should not have to reverse-engineer it from internal IDs.

## What a model is actually made of

To understand whether a model is open source or open weights, you have to ask what was actually released. An LLM is not just “the model.” There are the weights, which are the billions of learned numbers people download and run. There is the architecture and inference code that make those weights usable. Finally there is everything behind the training run: the training code, the dataset the model learned from, and the recipe of data mixtures, filtering, hyperparameters, and fine-tuning steps.

When a model is open weights, you usually get the trained model and enough code to run it. When it is genuinely open source, you get the build process too.

## Open weights

With an open weights release, you can download the model, run it locally, fine-tune it, and often use it commercially without depending on the provider’s servers.

Open weight models are a huge reason more people can experiment with capable LLM models without waiting on API access or paying per token. They are awesome and I think we need more US based companies building them. 

But the issue, per se, with open weight models is that you usually do not get the training data, the full training code, or the recipe. So you can use the model, but you cannot fully reproduce it or audit what it learned from. It is a black box you happen to own and can tinker with.

## Open source

Open source means getting what you need to understand, modify, and rebuild the thing from scratch.

Applied to an LLM, that means weights plus training code, the data or a complete description of it, and the recipe, under an OSI-compliant license that permits unrestricted use, modification, and redistribution.

That is what lets an outsider reproduce the model and audit what went into it. Models that actually aim for this are rarer. AllenAI’s OLMo and EleutherAI’s Pythia are good examples.

Going back to the Cursor example, Kimi K2.5 is actually released under a [*Modified* MIT license](https://github.com/MoonshotAI/Kimi-K2.5/blob/master/LICENSE). The modification requires products that use the model and exceed either 100 million monthly active users or $20 million in monthly revenue to provide attribution to Kimi K2.5. Yet the model is often described as open source. If a model's training process isn't fully reproducible, calling it an open-weight model seems like the more accurate label.

Basically, open weights is a finished cake you can eat and decorate, while open source is the cake plus the full recipe and every ingredient.

## Why the distinction matters

Teams make architecture, vendor, and risk decisions based on these labels. If “open source” really means “downloadable weights with restrictions,” that changes what you can audit, reproduce, deploy, and defend.

If the data and recipe are closed, you cannot really check what the model was trained on. That matters for bias, contamination, and copyright as the weights alone tell you nothing about the provenance.

None of this means open weight models are bad. They are useful, and they have done a lot to democratize access to alternative LLMs outside the closed source models from the big labs.

But if all you released was the weights, say open weights and own it. If your “own model” started from someone else’s base, say that too. The work can still be valuable. It just should not require users to reverse engineer what was actually built.