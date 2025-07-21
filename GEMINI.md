🧭 Visão Geral do Dashboard: "User Engagement & Content Insights"

1. 🎯 Visão Geral (KPI Cards)
Mostre métricas-chave no topo:

Métrica	Descrição
👥 Total de usuários	COUNT(user_id)
📝 Total de posts	SUM(total_posts)
✅ Posts publicados	SUM(published_posts)
🔥 Usuários ativos (30d)	COUNT WHERE activity_status IN (...)
⭐ Engajamento médio	AVG(engagement_score)
📊 Dados do sistema	system_data_points
2. 📈 Gráficos
a. Classificação de Usuários

Bar Chart: Quantidade de usuários por user_classification
Exemplo:

power_user: 12
active_user: 34
new_user: 20
👉 Ajuda a entender o nível de contribuição da base de usuários.
b. Atividade Recente

Stacked Bar Chart: activity_status por dia ou semana
👉 Visualiza tendências de atividade.

c. Distribuição de Engajamento

Histogram: Distribuição de engagement_score
👉 Mostra como está o engajamento geral e onde estão os outliers.

d. Tipos de Domínio de Email

Pie Chart ou Donut: Percentual por email_domain_type
👉 Ajuda a entender o tipo de público.

3. 📋 Tabela Interativa de Usuários
Exibe:

Nome
Email
Posts (totais/publicados)
Última atividade
Classificação
Score de engajamento
Status de perfil
Features:

Filtro por: status, classificação, idade da conta
Ordenação: por engagement_score, last_post_date
4. 🔍 Filtros Dinâmicos
Filtro	Valores
Período	Últimos 7/30/90 dias
Tipo de usuário	power_user, new_user etc.
Status de atividade	highly_active, dormant...
Domínio de e-mail	gmail, .edu, .org...
5. 🌐 Métricas Agregadas por Categoria
Se quiser expandir, com mais dados:

Total de categorias utilizadas
Diversidade de categorias (média, top 5)
Correlação entre diversidade e engajamento
