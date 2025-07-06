import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { BookOpen, Users, Mic, Image, Sparkles, Play, Pause, Volume2, Download, Share2, Settings, AlertCircle } from 'lucide-react'
import ApiService from './services/api.js'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [stories, setStories] = useState([])
  const [currentStory, setCurrentStory] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [backendConnected, setBackendConnected] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Check backend connectivity on app load
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const isHealthy = await ApiService.healthCheck()
        setBackendConnected(isHealthy)
        
        if (isHealthy) {
          // Create a demo user for the session
          const demoUser = await ApiService.createUser({
            username: `User_${Date.now()}`,
            email: `user${Date.now()}@demo.com`
          })
          setCurrentUser(demoUser)
        }
      } catch (error) {
        console.error('Backend connection failed:', error)
        setBackendConnected(false)
      }
    }
    
    checkBackend()
  }, [])

  // Sample data for demonstration
  const sampleStories = [
    {
      id: 1,
      title: "The Crystal Caverns",
      genre: "Fantasy",
      description: "A mystical adventure through ancient underground realms...",
      lastPlayed: "2 hours ago",
      progress: 75
    },
    {
      id: 2,
      title: "Space Station Alpha",
      genre: "Sci-Fi",
      description: "Survival horror aboard a derelict space station...",
      lastPlayed: "1 day ago",
      progress: 45
    },
    {
      id: 3,
      title: "The Haunted Manor",
      genre: "Horror",
      description: "Uncover the dark secrets of Blackwood Manor...",
      lastPlayed: "3 days ago",
      progress: 20
    }
  ]

  useEffect(() => {
    setStories(sampleStories)
  }, [])

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Backend Status Indicator */}
        {!backendConnected && (
          <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-yellow-200 font-medium">Demo Mode</p>
                <p className="text-yellow-300 text-sm">Backend connection unavailable. Some features may be limited.</p>
              </div>
            </div>
          </div>
        )}
        
        {backendConnected && (
          <div className="mb-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-green-200">Connected to AI Backend - All features available!</p>
            </div>
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Storytelling
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Create unlimited branching adventures with AI-powered storytelling
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Unlimited Stories
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Mic className="w-4 h-4 mr-2" />
              Voice Narration
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Multiplayer
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Image className="w-4 h-4 mr-2" />
              AI Art
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            onClick={() => setCurrentView('create')}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Create New Story
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
            onClick={() => setCurrentView('multiplayer')}
          >
            <Users className="w-5 h-5 mr-2" />
            Multiplayer
          </Button>
        </div>

        {/* Recent Stories */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Your Stories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card key={story.id} className="bg-white/10 border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-purple-300 border-purple-300">
                      {story.genre}
                    </Badge>
                    <span className="text-sm text-purple-200">{story.lastPlayed}</span>
                  </div>
                  <CardTitle className="text-white">{story.title}</CardTitle>
                  <CardDescription className="text-purple-200">
                    {story.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="text-sm text-purple-200 mb-1">Progress: {story.progress}%</div>
                      <div className="w-full bg-purple-800 rounded-full h-2">
                        <div 
                          className="bg-purple-400 h-2 rounded-full transition-all" 
                          style={{ width: `${story.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="ml-4 bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        setCurrentStory(story)
                        setCurrentView('story')
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose AI Storytelling?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Unlimited Branching</h3>
              <p className="text-purple-200">No memory limits - every choice creates new possibilities</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Voice Narration</h3>
              <p className="text-purple-200">Immersive AI-generated voice acting for every story</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiplayer Mode</h3>
              <p className="text-purple-200">Collaborate with friends to create amazing stories</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Illustrations</h3>
              <p className="text-purple-200">Beautiful artwork generated for key story moments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const CreateStoryView = () => {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [prompt, setPrompt] = useState('')

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="text-purple-200 hover:text-white mb-6"
              onClick={() => setCurrentView('home')}
            >
              ← Back to Home
            </Button>
            
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Create New Story</CardTitle>
                <CardDescription className="text-purple-200">
                  Start a new adventure with AI-generated content that adapts to your choices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white font-medium mb-2 block">Story Title</label>
                  <Input 
                    placeholder="Enter your story title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                  />
                </div>
                
                <div>
                  <label className="text-white font-medium mb-2 block">Genre</label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-white font-medium mb-2 block">Initial Story Prompt</label>
                  <Textarea 
                    placeholder="Describe the beginning of your story..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 min-h-32"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    disabled={!title || !genre || !prompt || isGenerating}
                    onClick={async () => {
                      if (!backendConnected) {
                        // Demo mode - simulate story creation
                        setIsGenerating(true)
                        setTimeout(() => {
                          setIsGenerating(false)
                          setCurrentView('story')
                          setCurrentStory({
                            id: Date.now(),
                            title,
                            genre,
                            description: prompt.substring(0, 100) + '...'
                          })
                        }, 2000)
                        return
                      }

                      // Real API call
                      setIsGenerating(true)
                      try {
                        const newStory = await ApiService.createStory({
                          title,
                          genre,
                          initial_prompt: prompt,
                          user_id: currentUser?.id || 1
                        })
                        setCurrentStory(newStory)
                        setCurrentView('story')
                      } catch (error) {
                        console.error('Failed to create story:', error)
                        alert('Failed to create story. Please try again.')
                      } finally {
                        setIsGenerating(false)
                      }
                    }}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Creating Story...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Create Story
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const StoryView = () => {
    const sampleStoryContent = [
      {
        id: 1,
        content: "You stand before the entrance to the Crystal Caverns, ancient runes glowing with an ethereal blue light. The air hums with magical energy, and you can hear the distant sound of water dripping in the depths below. Your torch flickers in the cool breeze that emanates from the cave mouth.",
        choices: [
          "Enter the caverns immediately",
          "Study the runes more carefully first",
          "Call out to see if anyone responds"
        ],
        hasAudio: true,
        hasImage: true
      }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="ghost" 
                className="text-purple-200 hover:text-white"
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-purple-400 text-purple-400">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="border-purple-400 text-purple-400">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-8">{currentStory?.title || "The Crystal Caverns"}</h1>

            {/* Story Content */}
            <div className="space-y-6">
              {sampleStoryContent.map((node) => (
                <Card key={node.id} className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <p className="text-white text-lg leading-relaxed mb-6">
                      {node.content}
                    </p>

                    {/* Audio Controls */}
                    {node.hasAudio && (
                      <div className="bg-purple-600/20 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-purple-400 text-purple-400"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <div className="flex-1">
                            <div className="text-purple-200 text-sm mb-1">Voice Narration</div>
                            <div className="w-full bg-purple-800 rounded-full h-2">
                              <div className="bg-purple-400 h-2 rounded-full w-1/3"></div>
                            </div>
                          </div>
                          <Volume2 className="w-4 h-4 text-purple-400" />
                        </div>
                      </div>
                    )}

                    {/* AI Generated Image */}
                    {node.hasImage && (
                      <div className="mb-6">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg h-48 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm opacity-75">AI-Generated Illustration</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Choices */}
                    {node.choices && (
                      <div>
                        <h3 className="text-white font-semibold mb-4">What do you choose?</h3>
                        <div className="space-y-3">
                          {node.choices.map((choice, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start text-left border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white p-4 h-auto"
                              onClick={() => {
                                setIsGenerating(true)
                                setTimeout(() => setIsGenerating(false), 1500)
                              }}
                            >
                              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                                {index + 1}
                              </span>
                              {choice}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Generating Indicator */}
              {isGenerating && (
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-purple-200">AI is crafting your story...</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MultiplayerView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="text-purple-200 hover:text-white mb-6"
            onClick={() => setCurrentView('home')}
          >
            ← Back to Home
          </Button>
          
          <Card className="bg-white/10 border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Multiplayer Stories</CardTitle>
              <CardDescription className="text-purple-200">
                Collaborate with friends to create amazing stories together in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="bg-purple-600 hover:bg-purple-700 h-24 flex-col">
                  <Users className="w-8 h-8 mb-2" />
                  Create Session
                </Button>
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white h-24 flex-col">
                  <BookOpen className="w-8 h-8 mb-2" />
                  Join Session
                </Button>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div>
                <h3 className="text-white font-semibold mb-4">How Multiplayer Works</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm mt-0.5">1</div>
                    <div>
                      <p className="text-white font-medium">Real-time Collaboration</p>
                      <p className="text-purple-200 text-sm">See choices and story updates from all participants instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm mt-0.5">2</div>
                    <div>
                      <p className="text-white font-medium">Democratic Choices</p>
                      <p className="text-purple-200 text-sm">Vote on story decisions or let the host make the final call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm mt-0.5">3</div>
                    <div>
                      <p className="text-white font-medium">Synchronized Experience</p>
                      <p className="text-purple-200 text-sm">Everyone sees the same story progress in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return <CreateStoryView />
      case 'story':
        return <StoryView />
      case 'multiplayer':
        return <MultiplayerView />
      default:
        return <HomeView />
    }
  }

  return renderCurrentView()
}

export default App

