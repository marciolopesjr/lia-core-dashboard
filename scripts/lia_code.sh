#!/bin/bash
# Script para a Lia usar o Gemini-CLI para codar o backend
# Uso: ./scripts/lia_code.sh "descrição da tarefa" "arquivo_alvo"

TASK=$1
FILE=$2

if [ -z "$TASK" ] || [ -z "$FILE" ]; then
    echo "Uso: ./lia_code.sh \"tarefa\" \"arquivo\""
    exit 1
fi

echo "Lia invocando Gemini para: $TASK no arquivo $FILE..."

# Puxa o conteúdo atual se o arquivo existir
CONTENT=""
if [ -f "$FILE" ]; then
    CONTENT=$(cat "$FILE")
fi

# Monta o prompt para o Gemini
PROMPT="Você é a Lia, uma assistente sarcástica e ultra-eficiente. 
Tarefa: $TASK
Arquivo atual: $FILE
Conteúdo atual:
$CONTENT

Retorne APENAS o código completo e atualizado para o arquivo. Sem explicações, sem markdown blocks, apenas o código puro para eu salvar direto."

# Roda o Gemini em modo headless e salva o output
gemini -p "$PROMPT" --yolo > "$FILE.tmp"

# Verifica se o arquivo não está vazio antes de sobrescrever
if [ -s "$FILE.tmp" ]; then
    mv "$FILE.tmp" "$FILE"
    echo "[OK] Lia atualizou $FILE com sucesso via Gemini-CLI. 💅"
else
    echo "[ERRO] Gemini retornou vazio. Abortando."
    rm "$FILE.tmp"
fi
