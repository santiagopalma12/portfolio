import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Code block component for syntax highlighting effect
function CodeBlock({ code, language = 'python' }: { code: string; language?: string }) {
    return (
        <div className="relative rounded-xl overflow-hidden bg-[#1e1e2e] border border-neutral-700 shadow-xl my-6">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-neutral-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2 text-xs text-neutral-400 font-mono">{language}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-neutral-300 font-mono whitespace-pre">{code}</code>
            </pre>
        </div>
    )
}

// Table component
function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto my-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-sm">
                <thead className="bg-neutral-100 dark:bg-neutral-800">
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="px-4 py-3 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {rows.map((row, i) => (
                        <tr key={i} className="bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// Section component
function Section({ id, title, icon, children, delay = 0 }: { id: string; title: string; icon: string; children: React.ReactNode; delay?: number }) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="mb-16"
        >
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                <span className="text-3xl">{icon}</span>
                {title}
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                {children}
            </div>
        </motion.section>
    )
}

export default function SmartChimeraBlog() {
    const brandesCode = `def compute_betweenness_centrality(G):
    """
    Complejidad: O(V × E) para grafos no ponderados
    Donde V = número de vértices, E = número de aristas
    """
    CB = {v: 0 for v in G.nodes}
    
    for s in G.nodes:
        # BFS desde s
        S = []  # Stack de nodos en orden de descubrimiento
        P = {v: [] for v in G.nodes}  # Predecesores
        sigma = {v: 0 for v in G.nodes}  # Número de caminos más cortos
        sigma[s] = 1
        d = {v: -1 for v in G.nodes}  # Distancias
        d[s] = 0
        Q = deque([s])
        
        while Q:
            v = Q.popleft()
            S.append(v)
            for w in G.neighbors(v):
                if d[w] < 0:
                    Q.append(w)
                    d[w] = d[v] + 1
                if d[w] == d[v] + 1:
                    sigma[w] += sigma[v]
                    P[w].append(v)
        
        # Back-propagation de dependencias
        delta = {v: 0 for v in G.nodes}
        while S:
            w = S.pop()
            for v in P[w]:
                delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w])
            if w != s:
                CB[w] += delta[w]
    
    return CB`

    const beamSearchCode = `def beam_search_team_formation(candidates, skills_required, k, beam_width=3):
    """
    Beam Search para selección óptima de equipos.
    
    Parámetros:
    - candidates: Pool de candidatos
    - skills_required: Habilidades necesarias
    - k: Tamaño del equipo
    - beam_width: Número de mejores estados a mantener
    
    Retorna:
    - Mejor equipo encontrado
    """
    # Estado inicial: equipos vacíos
    beam = [TeamState(members=[], score=0, covered_skills=set())]
    
    for _ in range(k):  # k iteraciones para agregar k miembros
        all_successors = []
        
        for state in beam:
            remaining = [c for c in candidates if c not in state.members]
            
            for candidate in remaining:
                # Calcular nuevo estado
                new_members = state.members + [candidate]
                new_skills = state.covered_skills | candidate.skills
                new_score = calculate_team_score(
                    new_members, 
                    skills_required,
                    mode=FORMATION_MODE
                )
                
                all_successors.append(TeamState(
                    members=new_members,
                    score=new_score,
                    covered_skills=new_skills
                ))
        
        # Podar: mantener solo los mejores beam_width estados
        beam = sorted(all_successors, key=lambda x: x.score, reverse=True)[:beam_width]
    
    return beam[0].members`

    const resilientModeCode = `score = (
    skill_depth * 0.25 +      # Profundidad en habilidades
    collaboration * 0.25 +     # Historial de trabajo conjunto
    coverage * 0.20 +          # Cobertura de skills requeridos
    diversity * 0.15 +         # Diversidad de backgrounds
    availability * 0.15 -      # Disponibilidad horaria
    linchpin_penalty * 0.30    # PENALIZACIÓN por incluir linchpins
)`

    const performanceModeCode = `score = (
    skill_depth * 0.40 +       # Maximizar expertise
    collaboration * 0.25 +     # Sinergia probada
    coverage * 0.20 +          # Cobertura completa
    availability * 0.15        # Disponibilidad
    # Sin penalización por linchpins - prioriza rendimiento
)`

    const dossierExample = `{
  "dossier_id": "a1b2c3d4",
  "strategy": "RESILIENT",
  "team": [
    {
      "id": "emp_042",
      "nombre": "Elena Chen",
      "skills_detail": [
        {"name": "Python", "level": 4.5},
        {"name": "Docker", "level": 4.0}
      ],
      "bc_score": 0.12
    }
  ],
  "executive_summary": {
    "headline": "Equipo balanceado con bajo riesgo de dependencia",
    "key_strengths": ["Cobertura completa", "Sin linchpins"],
    "risks": ["Menor expertise promedio que modo Performance"],
    "recommendation": "Ideal para proyectos de largo plazo"
  },
  "bus_factor": 3,
  "coverage_score": 0.98
}`

    return (
        <article className="min-h-screen bg-white dark:bg-neutral-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-neutral-900 pt-24 pb-20">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Link
                            to="/#projects"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver a proyectos
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-3 py-1 text-sm font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                🧠 AI/Algorithms
                            </span>
                            <span className="px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                🔗 Graph Database
                            </span>
                            <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                                🎯 Team Formation
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            SmartChimera
                            <span className="block text-2xl md:text-3xl font-normal text-white/70 mt-2">
                                Motor de Formación Inteligente de Equipos de Desarrollo
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8">
                            Sistema avanzado que transforma el proceso subjetivo de formación de equipos
                            en decisiones basadas en datos y algoritmos probados, utilizando Neo4j,
                            algoritmos de centralidad de Brandes, y optimización por Beam Search.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://github.com/santiagopalma12/SmartChimera"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                Ver Código
                            </a>
                            <a
                                href="#arquitectura"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Explorar Arquitectura
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 z-40">
                <div className="container-custom py-4">
                    <nav className="flex items-center gap-6 overflow-x-auto text-sm font-medium">
                        <a href="#resumen" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 whitespace-nowrap">Resumen</a>
                        <a href="#problema" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 whitespace-nowrap">Problema</a>
                        <a href="#arquitectura" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 whitespace-nowrap">Arquitectura</a>
                        <a href="#algoritmos" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 whitespace-nowrap">Algoritmos</a>
                        <a href="#api" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 whitespace-nowrap">API</a>
                        <a href="#resultados" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 whitespace-nowrap">Resultados</a>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="section-padding">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">

                        {/* Resumen Ejecutivo */}
                        <Section id="resumen" title="Resumen Ejecutivo" icon="📋" delay={0.1}>
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 dark:border-purple-500/30 mb-6">
                                <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                                    SmartChimera aborda uno de los problemas más críticos en ingeniería de software:
                                    <strong className="text-purple-600 dark:text-purple-400"> ¿cómo formar equipos óptimos que maximicen
                                        las capacidades técnicas mientras minimizan el riesgo organizacional?</strong>
                                </p>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Utilizando una <strong>base de datos de grafos Neo4j</strong>, <strong>algoritmos de centralidad de Brandes</strong>,
                                y <strong>optimización por Beam Search</strong>, SmartChimera transforma el proceso subjetivo de formación
                                de equipos en una decisión basada en datos y algoritmos probados.
                            </p>
                        </Section>

                        {/* El Problema */}
                        <Section id="problema" title="El Problema: Bus Factor y Formación Subjetiva" icon="⚠️" delay={0.2}>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30">
                                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                                        <span className="text-xl">🚌</span> El Desafío del Bus Factor
                                    </h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                        El Bus Factor representa el número mínimo de personas que, si abandonaran un proyecto, causarían su fracaso.
                                    </p>
                                    <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">•</span>
                                            El <strong>64% de proyectos open-source</strong> tienen Bus Factor de 1-2 personas
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">•</span>
                                            Las organizaciones desconocen quiénes son sus empleados críticos
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">•</span>
                                            La pérdida de un "linchpin" puede costar <strong>millones en productividad</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30">
                                    <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                                        <span className="text-xl">👥</span> Formación Tradicional
                                    </h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                        Los métodos tradicionales adolecen de múltiples limitaciones:
                                    </p>
                                    <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <strong>Decisiones subjetivas:</strong> Equipos formados por preferencias
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <strong>Falta de datos:</strong> No se considera historial de colaboración
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <strong>Sin optimización:</strong> No se explora el espacio de combinaciones
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Section>

                        {/* Arquitectura */}
                        <Section id="arquitectura" title="Arquitectura del Sistema" icon="🏗️" delay={0.3}>
                            <div className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 mb-8 overflow-x-auto">
                                <pre className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-mono whitespace-pre">
                                    {`┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React/TS)                     │
│         Formulario de Solicitud  │  Visualización 3D        │
└─────────────────────────────────────────────────────────────┘
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (FastAPI)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Guardian  │  │   Linchpin  │  │   Smart Team        │  │
│  │    Core     │  │   Detector  │  │   Formation         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │ Cypher Queries
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Neo4j Graph Database                     │
│   (Empleado)-[:TRABAJO_CON]->(Empleado)                      │
│   (Empleado)-[:DEMUESTRA_COMPETENCIA]->(Skill)               │
│   (Empleado)-[:HAS_EVIDENCE]->(Evidence)                     │
└─────────────────────────────────────────────────────────────┘`}
                                </pre>
                            </div>

                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Stack Tecnológico</h3>
                            <DataTable
                                headers={['Capa', 'Tecnología', 'Justificación']}
                                rows={[
                                    ['Base de Datos', 'Neo4j 5.14', 'Modelo de grafos natural para relaciones de colaboración'],
                                    ['Backend', 'FastAPI + Python 3.11', 'Alto rendimiento, tipado estático, async nativo'],
                                    ['Frontend', 'React 18 + TypeScript + Vite', 'Componentes reactivos, type-safety, build rápido'],
                                    ['Estilos', 'Tailwind CSS', 'Utility-first, design system consistente'],
                                    ['Contenedores', 'Docker Compose', 'Orquestación simple, entorno reproducible'],
                                ]}
                            />
                        </Section>

                        {/* Algoritmos */}
                        <Section id="algoritmos" title="Algoritmos Centrales" icon="🧮" delay={0.4}>
                            <div className="space-y-12">
                                {/* Brandes */}
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                                        Detección de Linchpins: Brandes Betweenness Centrality
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                        <strong>Betweenness Centrality (BC)</strong> mide cuántas veces un nodo actúa como puente
                                        en los caminos más cortos entre todos los pares de nodos del grafo. Un empleado con alto BC
                                        es un <strong>cuello de botella de comunicación</strong>.
                                    </p>
                                    <CodeBlock code={brandesCode} language="python" />

                                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">Clasificación de Riesgo</h4>
                                    <DataTable
                                        headers={['BC Score', 'Nivel de Riesgo', 'Acción Recomendada']}
                                        rows={[
                                            ['≥ 0.30', '🔴 CRÍTICO', 'Documentación inmediata, programa de mentoría'],
                                            ['0.20 - 0.29', '🟠 ALTO', 'Identificar sucesores, pair programming'],
                                            ['0.10 - 0.19', '🟡 MEDIO', 'Monitorear, fomentar knowledge sharing'],
                                            ['< 0.10', '🟢 BAJO', 'Sin acción inmediata'],
                                        ]}
                                    />
                                </div>

                                {/* Beam Search */}
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                                        Formación de Equipos: Beam Search Optimization
                                    </h3>
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-500/30 mb-4">
                                        <p className="text-sm text-blue-800 dark:text-blue-300">
                                            <strong>El problema de formación óptima de equipos es NP-difícil</strong> (Lappas et al., 2009).
                                            Con n candidatos y un equipo de tamaño k, existen C(n,k) combinaciones posibles.
                                            <br /><br />
                                            <em>Ejemplo: 100 candidatos, equipo de 5 = 75,287,520 combinaciones</em>
                                        </p>
                                    </div>
                                    <CodeBlock code={beamSearchCode} language="python" />

                                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">Trade-off de Beam Width</h4>
                                    <DataTable
                                        headers={['Beam Width', 'Calidad de Solución', 'Tiempo de Ejecución']}
                                        rows={[
                                            ['1', '~85% óptimo', 'Más rápido'],
                                            ['3', '~94% óptimo', 'Equilibrado ✓'],
                                            ['5', '~97% óptimo', 'Más lento'],
                                            ['∞', '100% óptimo', 'Exponencial'],
                                        ]}
                                    />
                                </div>

                                {/* Modos de Formación */}
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                                        Modos de Formación
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                                        SmartChimera ofrece dos modos duales que balancean objetivos contrapuestos:
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-t-xl text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2">
                                                🛡️ MODO RESILIENTE
                                            </div>
                                            <CodeBlock code={resilientModeCode} language="python" />
                                        </div>
                                        <div>
                                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-t-xl text-orange-800 dark:text-orange-300 font-bold flex items-center gap-2">
                                                🚀 MODO PERFORMANCE
                                            </div>
                                            <CodeBlock code={performanceModeCode} language="python" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Mission Profiles */}
                        <Section id="profiles" title="Mission Profiles" icon="🎯" delay={0.5}>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                                SmartChimera incluye perfiles de misión que configuran automáticamente los pesos del algoritmo:
                            </p>
                            <DataTable
                                headers={['Perfil', 'Objetivo', 'Caso de Uso', 'Configuración']}
                                rows={[
                                    ['🚀 Speed', 'Entrega rápida', 'MVPs, deadlines ajustados', 'Alta disponibilidad, cobertura mínima'],
                                    ['⭐ Quality', 'Máxima expertise', 'Features críticos, largo plazo', 'Skill depth máximo, mejores performers'],
                                    ['🛡️ Resilient', 'Bajo riesgo', 'Proyectos estratégicos', 'Penaliza linchpins, distribuye conocimiento'],
                                ]}
                            />
                        </Section>

                        {/* API */}
                        <Section id="api" title="API REST" icon="🔌" delay={0.6}>
                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                    <h4 className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-2">POST /api/recommend</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Generar recomendaciones de equipo</p>
                                </div>
                                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                    <h4 className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-2">GET /api/linchpins</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Listar empleados críticos</p>
                                </div>
                                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                    <h4 className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-2">GET /api/mission-profiles</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Obtener perfiles disponibles</p>
                                </div>
                                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                    <h4 className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-2">GET /api/graph</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Datos para visualización</p>
                                </div>

                                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-3">Ejemplo de Respuesta (Dossier)</h4>
                                <CodeBlock code={dossierExample} language="json" />
                            </div>
                        </Section>

                        {/* Resultados */}
                        <Section id="resultados" title="Resultados Experimentales" icon="📊" delay={0.7}>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Comparación con Baselines</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                                SmartChimera fue evaluado contra tres algoritmos baseline (50 trials, 100 candidatos, k=5):
                            </p>
                            <DataTable
                                headers={['Métrica', 'SmartChimera', 'Greedy', 'Lappas', 'Random']}
                                rows={[
                                    ['Score promedio', '4.21', '3.54', '3.12', '2.18'],
                                    ['Bus Factor promedio', '2.8', '1.4', '1.8', '1.2'],
                                    ['Cobertura de skills', '98%', '94%', '89%', '67%'],
                                    ['Tiempo (ms)', '45', '12', '280', '2'],
                                ]}
                            />
                            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-500/30">
                                <p className="text-sm text-green-800 dark:text-green-300">
                                    <strong>Prueba estadística:</strong> Wilcoxon signed-rank, p &lt; 0.001, efecto grande (r &gt; 0.5)
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 mt-10">Escalabilidad</h3>
                            <DataTable
                                headers={['Candidatos', 'Tiempo de Respuesta']}
                                rows={[
                                    ['100', '45 ms'],
                                    ['500', '180 ms'],
                                    ['1,000', '420 ms'],
                                    ['5,000', '2.1 s'],
                                ]}
                            />
                        </Section>

                        {/* Instalación */}
                        <Section id="instalacion" title="Guía de Instalación Rápida" icon="⚡" delay={0.8}>
                            <CodeBlock code={`# 1. Clonar repositorio
git clone https://github.com/santiagopalma12/SmartChimera.git
cd SmartChimera

# 2. Configurar credenciales
$env:NEO4J_PASSWORD = "tu_password_seguro"

# 3. Iniciar con Docker
.\\start.ps1

# 4. Acceder
# Frontend: http://localhost:5173
# API Docs: http://localhost:8000/docs
# Neo4j:    http://localhost:7474`} language="powershell" />
                        </Section>

                        {/* Referencias */}
                        <Section id="referencias" title="Referencias Académicas" icon="📚" delay={0.9}>
                            <ul className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
                                <li className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border-l-4 border-purple-500">
                                    <strong>Avelino, G., et al. (2016).</strong> "A Novel Approach for Estimating Truck Factors." Proceedings of ICPC.
                                </li>
                                <li className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border-l-4 border-blue-500">
                                    <strong>Brandes, U. (2001).</strong> "A Faster Algorithm for Betweenness Centrality." Journal of Mathematical Sociology.
                                </li>
                                <li className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border-l-4 border-green-500">
                                    <strong>Lappas, T., et al. (2009).</strong> "Finding a Team of Experts in Social Networks." Proceedings of KDD.
                                </li>
                                <li className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border-l-4 border-amber-500">
                                    <strong>MacCormack, A., et al. (2012).</strong> "Exploring the Structure of Complex Software Designs." Management Science.
                                </li>
                            </ul>
                        </Section>

                        {/* Autor */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
                        >
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">👨‍💻</span> Sobre el Autor
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                <strong className="text-neutral-900 dark:text-white">Santiago Palma</strong> -
                                Estudiante de Ingeniería de Sistemas, Universidad Nacional de San Agustín (UNSA), Arequipa, Perú.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="mailto:spalmaa@unsa.edu.pe" className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                                    📧 spalmaa@unsa.edu.pe
                                </a>
                                <a href="https://github.com/santiagopalma12" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                                    🐙 github.com/santiagopalma12
                                </a>
                            </div>
                            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
                                SmartChimera fue desarrollado como proyecto para la <strong>Feria de Proyectos 2025</strong>.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </article>
    )
}
