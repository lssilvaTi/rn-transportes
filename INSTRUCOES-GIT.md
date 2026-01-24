# RN Transportes – passos para subir no GitHub (conta tilssilva1103)

O template foi copiado e o SSH já está configurado. Falta rodar estes comandos **no seu terminal** (fora do Cursor/sandbox).

## 1. Ajustar permissão do SSH (só uma vez)

```bash
chmod 600 ~/.ssh/config
```

## 2. Criar o repositório no GitHub

1. Acesse https://github.com/new
2. Faça login na conta **tilssilva1103**
3. **Repository name:** `rn-transportes`
4. Deixe **Public**
5. **Não** marque "Add a README" (o projeto já tem conteúdo)
6. Clique em **Create repository**

## 3. Preparar e enviar o projeto

Abra o terminal e execute, **na pasta do projeto RN Transportes**:

```bash
# Se quiser o projeto solto (recomendado), mova a pasta:
mv /Users/lucassantossilva/axory-studio/rn-transportes /Users/lucassantossilva/rn-transportes
cd /Users/lucassantossilva/rn-transportes
```

Se preferir deixar dentro de `axory-studio`:

```bash
cd /Users/lucassantossilva/axory-studio/rn-transportes
```

Depois:

```bash
# Remover o .git incompleto (se existir)
rm -rf .git

# Inicializar repositório e configurar a conta tilssilva1103
git init
git config --local user.name "tilssilva1103"
git config --local user.email "tilssilva1103@users.noreply.github.com"

# Ou use seu e-mail real da conta tilssilva1103:
# git config --local user.email "seu-email@exemplo.com"

# Primeiro commit
git add .
git commit -m "Initial commit - template Axory Studio para RN Transportes"

# Remote usando a chave da tilssilva1103 (Host github-tilssilva)
git remote add origin git@github-tilssilva:tilssilva1103/rn-transportes.git

# Garantir branch main e enviar
git branch -M main
git push -u origin main
```

## 4. Testar a chave tilssilva1103

```bash
ssh -T git@github-tilssilva
```

A saída esperada é algo como: `Hi tilssilva1103! You've successfully authenticated...`

---

Depois do push, abra a pasta do **rn-transportes** no Cursor e avise quando quiser começar as edições do site.
