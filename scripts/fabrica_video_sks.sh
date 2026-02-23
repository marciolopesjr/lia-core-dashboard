#!/bin/bash
# LIA_FABRICA_VIDEO v1.0 💅
# Script para gerar vídeos curtos de divulgação (estilo Reels/Stories)
# Uso: ./scripts/fabrica_video_sks.sh

OUTPUT_DIR="assets/branding"
mkdir -p "$OUTPUT_DIR"

# 1. Gerar um vídeo de 5 segundos com fundo degradê e texto animado
# Vamos usar o ffmpeg para criar um vídeo a partir de filtros (sem precisar de imagens base)
ffmpeg -y -f lavfi -i color=c=black:s=1080x1920:d=5 \
-vf "drawtext=text='SKS MOBILITY':fontcolor=magenta:fontsize=80:x=(w-text_w)/2:y=(h-text_h)/2-100:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,
      drawtext=text='ECONOMIA REAL':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=(h-text_h)/2+20:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,
      drawtext=text='QUALIDADE SIKEIRA':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=(h-text_h)/2+100:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" \
-c:v libx264 -pix_fmt yuv420p "$OUTPUT_DIR/sks_teaser_v1.mp4"

echo "[LIA_FABRICA_VIDEO] Vídeo SkS gerado com sucesso em $OUTPUT_DIR 💅"
