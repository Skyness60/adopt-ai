# 🐾 Generative Pets – L’assistant d’adoption intelligent

**Generative Pets** est une application web basée sur l’intelligence artificielle 🤖, conçue pour aider les utilisateurs à **trouver leur compagnon idéal** (chien, chat, lapin, etc.) et à **mieux comprendre les animaux** à travers une expérience interactive et bienveillante.  
Grâce à l’intégration d’un modèle multimodal (texte + image) via **LM Studio**, l’application peut **analyser des photos d’animaux** 🐶🐱 et répondre de manière **naturelle, empathique et personnalisée** ❤️.

---

## ✨ Fonctionnalités principales

### 💬 Chat intelligent
- Discussion naturelle avec un assistant IA bienveillant nommé **Generative Pets**.  
- Réponses douces, empathiques et encourageantes.  
- Support du **langage naturel en français**.  
- Sauvegarde automatique des conversations dans `localStorage`.

### 📸 Analyse d’image
- Envoi d’images d’animaux directement dans le chat.
- Détection et **reconnaissance de la race** (si le modèle supporte les images).  
- L’IA explique ses observations avec des **conseils pour l’adoption ou l’entretien**.  

### 💅 Interface utilisateur
- Interface moderne, fluide et responsive.  
- Animations avec **Framer Motion** et design pastel apaisant.  
- Upload d’image avec **prévisualisation en direct**.  
- Indicateurs de chargement, multi-chat et gestion intuitive.  

---

## 🧩 Stack technique

| Outil / Technologie | Utilisation |
|----------------------|--------------|
| **Next.js 15 (Turbopack)** | Framework principal (frontend + backend) |
| **TypeScript** | Typage statique et sécurité du code |
| **TailwindCSS** | Design responsive et moderne |
| **Framer Motion** | Animations et transitions fluides |
| **React Markdown + remark-gfm** | Affichage des messages enrichis (gras, listes, etc.) |
| **LM Studio** | Serveur local pour exécuter le modèle IA |

---

## ⚙️ Installation & configuration

### 1. Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/adopt-ai.git
cd adopt-ai
