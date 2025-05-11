'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('فشل تسجيل الدخول');
            } else {
                toast.success('تم تسجيل الدخول بنجاح');
                router.push('/dashboard');
            }
        } catch (error) {
            toast.error('حدث خطأ ما');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className=' min-h-[80vh] flex flex-col justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            تسجيل الدخول
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="البريد الإلكتروني"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="كلمة المرور"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "#ff6600" }}
                            >
                                تسجيل الدخول
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link href="/auth/register" style={{ textDecoration: 'none' }}>
                                    <Typography variant="body2" color="#ff6600" >
                                        ليس لديك حساب؟ سجل الآن
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </motion.div>
        </Container>
    );
} 