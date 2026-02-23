#!/bin/bash
# LIA_FABRICA_CORE v1.1 💅
# Script para gerar ativos SKS (SiKeira)
OUTPUT_DIR="assets/branding"
mkdir -p "$OUTPUT_DIR"

# 1. Logo Circular Branco SKS
convert -size 800x800 xc:none \
    -fill white -draw "circle 400,400 400,5" \
    -fill black -pointsize 150 -gravity center -annotate +0-50 "SKS" \
    -fill black -pointsize 40 -gravity center -annotate +0+100 "SiKeira Scooters" \
    "$OUTPUT_DIR/sks_round_v1.png"

# 2. Logo Circular Dark Mode (Negativo)
convert "$OUTPUT_DIR/sks_round_v1.png" -negate "$OUTPUT_DIR/sks_round_dark_v1.png"

# 3. Card de Divulgação (Banner)
convert -size 1200x630 xc:black \
    -fill "#ff00ff" -pointsize 80 -gravity center -annotate +0-100 "SKS MOBILITY" \
    -fill white -pointsize 30 -gravity center -annotate +0+50 "• SEM CNH  • SEM EMPLACAMENTO  • 100% ELÉTRICA" \
    "$OUTPUT_DIR/sks_banner_v1.png"

echo "[LIA_FABRICA] Ativos gerados com sucesso em $OUTPUT_DIR 💅"
