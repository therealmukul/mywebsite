---
title: "Open Weights Are Not Open Source"
description: "Why 'we trained our own model' often means tuning someone else's open-weight LLM, not building one from scratch."
date: "Jun 02 2026"
---

A lot of AI marketing lives in the gap between what the public hears when a company says "we trained our own model" and what the company actually did.

Most people hear that and picture a homegrown LLM (original architecture, original training run, original dataset, etc). But in practice, a lot of "our model" announcements mean something narrower. More often than not, it means the company started with someone else's open-weight model, tuned it, wrapped it in a product, and gave the result a new name.

Don't get me wrong, that is still real work. Tedious, hard work, actually. The tuning, data, serving, product wrapper, and UX can be the whole reason the thing is useful. But it does mean "our model" often means "our version of someone else's base model."

Take Cursor's Composer 2 as a recent example. It launched like a native Cursor model, but people quickly connected it to Moonshot AI's Kimi K2.5. Cursor later said it started from an open-source base. Moonshot described Kimi K2.5 as the foundation under an authorized commercial path via Fireworks ([DataStudios](https://www.datastudios.org/post/cursor-composer-2-and-kimi-k2-5-what-happened-what-cursor-later-admitted-and-why-the-controversy), [Tom Tunguz](https://tomtunguz.com/cursor-kimi-open-source-ai-imperative/)).

The point is not that Cursor did no real work. The point is that the base model matters, and users should not have to reverse-engineer it from internal IDs.

## What a model is actually made of

To understand the whether a model is open source or open weights, you have to ask what was actually released. An LLM is not just "the model." There are the weights, which are the billions of learned numbers people download and run. There is the architecture and inference code that make those weights usable. Then there is everything behind the training run: the training code, the dataset the model learned from, and the recipe of data mixtures, filtering, hyperparameters, and fine-tuning steps.

When a model is open weights, you usually get the trained model and enough code to run it. When it is genuinely open source, you get the build process too.

## Open weights

With an open weights release, you can download the model, run it locally, fine-tune it, and often use it commercially without depending on the provider's servers.

That is real value. Open-weight models are a huge reason more people can experiment with capable AI without waiting on API access or paying per token.

But you usually do not get the training data, the full training code, or the recipe. So you can use the model, but you cannot fully reproduce it or audit what it learned from. It is a black box you happen to own.

## Open source

Open source means getting what you need to understand, modify, and rebuild the thing from scratch.

Applied to an LLM, that means weights plus training code, the data or a complete description of it, and the recipe, under a genuinely open license like Apache 2.0 or MIT, with no use restrictions.

That is what lets an outsider reproduce the model and audit what went into it. Models that actually aim for this are rarer. AllenAI's OLMo and EleutherAI's Pythia are the usual examples.

**Basically, open weights is a finished cake you can eat and decorate, while open source is the cake plus the full recipe and every ingredient.**

## Why the distinction matters

Teams make architecture, vendor, and risk decisions based on these labels. If "open source" really means "downloadable weights with restrictions," that changes what you can audit, reproduce, deploy, and defend.

If the data and recipe are closed, you cannot really check what the model was trained on. That matters for bias, contamination, and copyright. The weights alone tell you nothing about provenance.

The license matters too. Open weight models often come with acceptable-use policies or scale caps, like Llama's limit on the largest platforms. True open-source licenses do not restrict who uses the model or how.

Finally, there is also the basic honesty problem. The Open Source Initiative published its [Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition) in late 2024 because so many open-weight models were being marketed as open source.

That being said, none of this means open weight models are bad. They are useful, and they have done a lot to democratize access to alternative LLMs outside the closed source models from the big labs.

But if all you released was the weights, say open weights and own it. If your "own model" started from someone else's base, say that too. The work can still be valuable. It just should not require users to reverse engineer what was actually built.
