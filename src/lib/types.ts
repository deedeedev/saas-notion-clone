import { Server as NetServer, Socket } from "net"
import { NextApiResponse } from "next"
import { Server as SocketIOServer } from "socket.io"

export type TYPE_PRICING_PLANS = "Free Plan" | "Pro Plan"

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
