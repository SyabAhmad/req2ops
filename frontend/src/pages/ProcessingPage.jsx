import { useState, useEffect } from 'react'
import ProcessingStatus from '../components/ProcessingStatus.jsx'

const FLOATING_WORDS = [
  { text: 'Architecture', x: 5, y: 5 },
  { text: 'API Design', x: 70, y: 3 },
  { text: 'Database', x: 15, y: 12 },
  { text: 'Security', x: 80, y: 10 },
  { text: 'Frontend', x: 3, y: 22 },
  { text: 'DevOps', x: 75, y: 20 },
  { text: 'Testing', x: 20, y: 30 },
  { text: 'Deploy', x: 85, y: 28 },
  { text: 'UI/UX', x: 8, y: 38 },
  { text: 'Performance', x: 72, y: 36 },
  { text: 'Microservices', x: 90, y: 45 },
  { text: 'CI/CD', x: 5, y: 48 },
  { text: 'Kubernetes', x: 78, y: 52 },
  { text: 'GraphQL', x: 12, y: 56 },
  { text: 'Auth', x: 88, y: 60 },
  { text: 'Cache', x: 3, y: 65 },
  { text: 'Scaling', x: 82, y: 68 },
  { text: 'Monitoring', x: 10, y: 72 },
  { text: 'Pipeline', x: 75, y: 75 },
  { text: 'Sprint', x: 20, y: 78 },
  { text: 'Milestone', x: 88, y: 82 },
  { text: 'Backlog', x: 5, y: 85 },
  { text: 'Refactor', x: 70, y: 88 },
  { text: 'Integration', x: 15, y: 92 },
  { text: 'Container', x: 80, y: 92 },
  { text: 'Serverless', x: 40, y: 5 },
  { text: 'WebSocket', x: 55, y: 12 },
  { text: 'RabbitMQ', x: 35, y: 18 },
  { text: 'Kafka', x: 60, y: 25 },
  { text: 'Redis', x: 30, y: 32 },
  { text: 'PostgreSQL', x: 50, y: 8 },
  { text: 'MongoDB', x: 42, y: 38 },
  { text: 'Docker', x: 65, y: 42 },
  { text: 'Nginx', x: 25, y: 45 },
  { text: 'Load Balancer', x: 55, y: 50 },
  { text: 'Rate Limiting', x: 18, y: 60 },
  { text: 'Webhook', x: 68, y: 58 },
  { text: 'OAuth', x: 38, y: 65 },
  { text: 'JWT', x: 92, y: 35 },
  { text: 'REST', x: 28, y: 15 },
  { text: 'gRPC', x: 48, y: 55 },
  { text: 'Bootstrap', x: 8, y: 15 },
  { text: 'React', x: 92, y: 15 },
  { text: 'TypeScript', x: 45, y: 45 },
  { text: 'Python', x: 62, y: 65 },
  { text: 'Go', x: 32, y: 75 },
  { text: 'Rust', x: 85, y: 75 },
  { text: 'Java', x: 22, y: 82 },
  { text: 'Node.js', x: 58, y: 82 },
  { text: 'Lambda', x: 42, y: 92 },
  { text: 'Terraform', x: 72, y: 15 },
  { text: 'Ansible', x: 15, y: 42 },
  { text: 'Prometheus', x: 90, y: 55 },
  { text: 'Grafana', x: 25, y: 52 },
  { text: 'Elasticsearch', x: 60, y: 72 },
  { text: 'Consul', x: 35, y: 88 },
  { text: 'Vault', x: 78, y: 42 },
  { text: 'Stripe', x: 48, y: 28 },
  { text: 'Twilio', x: 8, y: 78 },
  { text: 'S3', x: 92, y: 88 },
  { text: 'CloudFront', x: 55, y: 35 },
]

function FloatingWord({ text, x, y, delay }) {
  return (
    <span
      className="absolute text-[13px] font-semibold select-none pointer-events-none whitespace-nowrap"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color: 'rgba(0,0,0,0.8)',
        animation: `floatFade 5s ease-in-out ${delay}s infinite`,
      }}
    >
      {text}
    </span>
  )
}

export default function ProcessingPage({ input, files, onComplete, onError }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 2, 95))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)]">
      {/* Floating background words */}
      {FLOATING_WORDS.map((word, i) => (
        <FloatingWord
          key={word.text}
          text={word.text}
          x={word.x}
          y={word.y}
          delay={i * 0.2}
        />
      ))}

      {/* Center panel */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-right text-[11px] text-gray-400 tabular-nums">{Math.round(progress)}%</p>
        </div>

        <ProcessingStatus input={input} files={files} onComplete={onComplete} onError={onError} />
      </div>
    </div>
  )
}
